async function loadData() {
  try {
    const response = await fetch("../data.json");
    if (!response.ok) throw new Error("Failed to fetch data.json");

    const json = await response.json();
    const labels = json.map(item => item.name);
    const values = json.map(item => item.value);

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: labels.map(() =>
            `hsl(${Math.random() * 360}, 70%, 50%)`
          ),
          borderColor: '#121212',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#e0e0e0" } },
          title: {
            display: true,
            text: "Pie Chart (from JSON, not CSV)",
            color: "#bb86fc",
            font: { size: 20 }
          }
        }
      }
    });
  } catch (err) {
    document.getElementById("error").textContent = "Error: " + err.message;
  }
}

loadData();
