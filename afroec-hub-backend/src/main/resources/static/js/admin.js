(function () {
    "use strict";

    const dashboardEl = document.getElementById("dashboard-charts");
    if (!dashboardEl) {
        return;
    }

    fetch("/admin/api/stats")
        .then((res) => res.json())
        .then((payload) => {
            const stats = payload.data;
            if (!stats) return;
            renderLine(stats.applicationsOverTime);
            renderPie("programChart", stats.applicationsByProgram, "Applications by Program");
            renderBar("genderChart", stats.applicationsByGender, "Applications by Gender");
        })
        .catch((err) => console.error("Failed to load stats", err));

    const palette = ["#0f766e", "#f59e0b", "#2563eb", "#dc2626", "#7c3aed", "#059669", "#db2777"];

    function renderLine(series) {
        const el = document.getElementById("timeChart");
        if (!el || !series) return;
        new Chart(el, {
            type: "line",
            data: {
                labels: series.map((p) => p.label),
                datasets: [{
                    label: "Applications",
                    data: series.map((p) => p.count),
                    borderColor: "#0f766e",
                    backgroundColor: "rgba(15,118,110,0.15)",
                    fill: true,
                    tension: 0.35
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    }

    function renderPie(id, map, title) {
        const el = document.getElementById(id);
        if (!el || !map) return;
        const labels = Object.keys(map);
        new Chart(el, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [{ data: labels.map((k) => map[k]), backgroundColor: palette }]
            },
            options: { responsive: true, plugins: { title: { display: true, text: title } } }
        });
    }

    function renderBar(id, map, title) {
        const el = document.getElementById(id);
        if (!el || !map) return;
        const labels = Object.keys(map);
        new Chart(el, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{ label: title, data: labels.map((k) => map[k]), backgroundColor: palette }]
            },
            options: { responsive: true, plugins: { legend: { display: false }, title: { display: true, text: title } } }
        });
    }
})();
