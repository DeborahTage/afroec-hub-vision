---
name: spring-boot-backend-bootstrap
description: Set up and verify a Spring Boot backend with PostgreSQL — check database status, create roles/databases, fix connection config, resolve HikariCP errors, and confirm the backend starts.
---

# Spring Boot Backend Bootstrap

Recurring problem: Spring Boot backend fails to start due to database connection issues (HikariCP, missing roles, wrong credentials, port conflicts).

## Procedure

### 1. Check PostgreSQL status

```bash
systemctl is-active postgresql
pg_isready -h localhost -p 5432 2>&1
ss -tlnp | grep 5432
```

If PostgreSQL is not running:
```bash
sudo systemctl start postgresql
```

### 2. Read the backend configuration

```bash
# Find config files
glob **/application*.{yml,yaml,properties}

# Read them — look for:
# - spring.datasource.url (database name, port)
# - spring.datasource.username
# - spring.datasource.password
# - server.port (default 8080)
```

### 3. Verify database and role exist

```bash
# Test connection with configured credentials
psql -h localhost -p 5432 -U <username> -d <database> -c "SELECT 1" 2>&1
```

If the role or database doesn't exist:
```bash
sudo -u postgres psql -c "CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';"
sudo -u postgres psql -c "CREATE DATABASE <database> OWNER <username>;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE <database> TO <username>;"
```

### 4. Fix HikariCP connection failures

Common causes and fixes:

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot create PoolConnectionPool` | Wrong credentials | Update `application.yml` username/password |
| `Connection refused` | PostgreSQL not running or wrong port | Start PostgreSQL, check port |
| `Database does not exist` | DB not created | Create it (step 3) |
| `Role does not exist` | User not created | Create it (step 3) |
| `Connection timed out` | Host unreachable or firewall | Check `pg_isready`, network |

### 5. Kill stale backend processes

```bash
# Find any running Spring Boot / Java processes
pgrep -af "spring-boot|java.*jar" 2>&1
lsof -i:8080 2>&1

# Kill if found (see port-conflict-resolution skill for full workflow)
lsof -ti:8080 | xargs kill -9 2>/dev/null
```

### 6. Start the backend

```bash
# Maven wrapper
cd <project>/backend && ./mvnw spring-boot:run

# Or with Docker
docker compose up -d --build backend

# Background with logs
nohup ./mvnw spring-boot:run > /tmp/spring-boot.log 2>&1 &
sleep 5 && tail -20 /tmp/spring-boot.log
```

### 7. Verify the backend is healthy

```bash
# Wait for startup (Spring Boot takes 10-30 seconds)
sleep 10 && curl -s http://localhost:8080/actuator/health 2>&1

# Check for startup errors in logs
docker logs <container_name> 2>&1 | grep -E "Started|ERROR|Exception" | tail -10
```

## Common gotchas

- **Port 8080 conflict**: See `port-conflict-resolution` skill.
- **H2 file lock errors**: If using H2 in file mode, delete the lock file: `rm -f data/*.mv.db data/*.trace.db` then restart.
- **Flyway migration failures**: Check `flyway_schema_history` table for partial failures. May need manual cleanup.
- **Wrong PostgreSQL image**: If using PostGIS features, ensure Docker uses `postgis/postgis` image, not plain `postgres`.
- **Application profiles**: Check if `spring.profiles.active` is set correctly (`dev`, `prod`, etc.) — different profiles may have different DB configs.
