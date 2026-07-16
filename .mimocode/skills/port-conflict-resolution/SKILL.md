---
name: port-conflict-resolution
description: Diagnose and resolve port 8080 (or other port) conflicts for Spring Boot / Vite dev servers — find the occupying process, kill it safely, verify the port is free, and restart the intended service.
---

# Port Conflict Resolution

Recurring problem: port 8080 (or other dev ports) is occupied by a stale process when starting a Spring Boot backend or Vite dev server.

## Procedure

### 1. Identify what is on the port

```bash
# Primary method
lsof -i :8080 -P -n 2>/dev/null

# Fallback methods (if lsof shows nothing)
ss -tlnp 'sport = :8080'
fuser -v 8080/tcp 2>&1
cat /proc/net/tcp | awk '$2 ~ /:1F90/ {split($10,a,"/"); print a[1]}' 2>/dev/null
```

### 2. Classify the occupying process

| Process | Likely cause | Action |
|---------|-------------|--------|
| `java` / Spring Boot | Stale backend from previous run | Kill it |
| `node` / `vite` / `react-scripts` | Frontend dev server on wrong port | Kill if blocking backend |
| `docker` | Container mapping to host port | `docker stop <container>` |

```bash
# Get details of PIDs found
ps -p <PID> -o pid,ppid,cmd --no-headers
```

### 3. Kill the process

```bash
# Normal kill (graceful)
kill <PID>

# If still alive after 2 seconds
kill -9 <PID>

# Kill by port directly
fuser -k 8080/tcp 2>&1

# For Docker containers
docker stop <container_name>
```

**Note**: If the process runs as root, you'll need `sudo kill` or `sudo fuser -k`. Always confirm with the user before sudo operations.

### 4. Verify port is free

```bash
lsof -i :8080 -P -n 2>/dev/null || echo "Port 8080 is free"
ss -tlnp 'sport = :8080' 2>/dev/null | grep -q LISTEN && echo "STILL IN USE" || echo "Port 8080 is free"
```

### 5. Restart the intended service

**For Spring Boot backend:**
```bash
cd <project>/backend && ./mvnw spring-boot:run
# or if using Docker:
docker compose up -d --build backend
```

**For Vite frontend:**
```bash
cd <project> && npm run dev
# Background mode:
nohup npm run dev > /tmp/vite.log 2>&1 &
sleep 3 && cat /tmp/vite.log
```

### 6. Verify the service started correctly

```bash
# Spring Boot
curl -s http://localhost:8080/actuator/health 2>&1

# Vite
lsof -i -P | grep -E 'vite|node' | grep LISTEN
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173
```

## Common gotchas

- **Two services fighting for the same port**: If both frontend and backend default to 8080, configure one to use a different port (e.g., Vite on 5173, Spring Boot on 8080).
- **Lingering Java processes after IDE close**: IntelliJ/VS Code may leave Spring Boot running. Check `ps aux | grep java`.
- **Docker port mapping**: `docker ps` shows port mappings — a stopped container may still hold the port if `docker compose down` wasn't run.
- **Zombie sockets**: After killing a process, the socket may linger in TIME_WAIT for ~60 seconds. Wait or use `SO_REUSEADDR` if configuring the server.
