let chart;
document.addEventListener("DOMContentLoaded", () => {
    moodSleepTracker();
    updateChart();
})

const moodSleepTracker = () => {
    const moodChips = document.querySelectorAll('#moodChips .chip');
    const sleepChips = document.querySelectorAll('#sleepChips .chip');
    const submitButton = document.getElementById('submit');
    const clearButton = document.getElementById('clear');
    let selectedMood = null;
    let selectedSleep = null;

    moodChips.forEach(chip => {
        chip.addEventListener('click', () => {
            moodChips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            selectedMood = chip.getAttribute('data-value');
            console.log(selectedMood);
        });
    });

    sleepChips.forEach(chip => {
        chip.addEventListener('click', () => {
            sleepChips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            selectedSleep = chip.getAttribute('data-value');
            console.log(selectedSleep);
        });
    });

    clearButton.addEventListener('click', () => {
        clearSelections();
    })

    const clearSelections = () => { 
        if (selectedMood || selectedSleep) {
            moodChips.forEach(chip => chip.classList.remove('selected'));
            sleepChips.forEach(chip => chip.classList.remove('selected'));
            selectedMood = null;
            selectedSleep = null;
            console.log(selectedMood);
            console.log(selectedSleep);
        }
    }

    submitButton.addEventListener('click', () => { 
        if (selectedMood && selectedSleep) {
            const entry = {
                mood: parseInt(selectedMood),
                sleep: parseInt(selectedSleep)
            };
            saveEntry(entry);
            updateChart();
        } else { 
            alert("Please select both mood and sleep quality!")
        }
        clearSelections();
    })
}

// Hide chart if there is no data yet


const updateChart = () => {
    const ctx = document.getElementById('tracker');
    
    const storedData = JSON.parse(localStorage.getItem('moodSleepData')) || [];
    const moodData = storedData.map(entry => entry.mood);
    const sleepData = storedData.map(entry => entry.sleep);

    const chartContainer = document.getElementById('chartContainer');
    
    if (storedData.length === 0) {
        chartContainer.style.display = 'none';
        return;
    } else {
        chartContainer.style.display = 'block';
    }
    // Create an array of number values for the # of entries stored
    let labels = [0];
    for (let i = 1; i <= storedData.length; i++) {
        labels.push(`Entry ${i}`)
    }

    const data = {
        labels: labels,
        datasets: [{
            label: 'Mood',
            data: [0, ...moodData],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.4,
        },
        {
            label: 'Sleep Quality',
            data: [0, ...sleepData],
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            tension: 0.4,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Inter',
                        },
                        boxWidth: 20,
                        boxHeight: 20,
                        useBorderRadius: true,
                        borderRadius: 5,
                        color: '#000000',
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        max: 5,
                        stepSize: 1,
                        color: '#000000',
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    ticks: {
                        color: '#000000',
                    },
                    grid: {
                        display: false,
                    }
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, config);
};

const saveEntry = (entry) => { 
    let data = JSON.parse(localStorage.getItem('moodSleepData')) || [];
        data.push(entry);
        localStorage.setItem('moodSleepData', JSON.stringify(data));
}

const deleteStoredDataButton = document.getElementById('deleteData');

deleteStoredDataButton.addEventListener('click', () => { 
        localStorage.removeItem('moodSleepData');
        updateChart();
})
