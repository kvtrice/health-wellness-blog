document.addEventListener("DOMContentLoaded", () => {
    moodTracker();
})

const moodTracker = () => {
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
        } else { 
            alert("Please select both mood and sleep quality!")
        }
        clearSelections();
    })
}

const saveEntry = (entry) => { 
    let data = JSON.parse(localStorage.getItem('moodSleepData')) || [];
        data.push(entry);
        localStorage.setItem('moodSleepData', JSON.stringify(data));
}

