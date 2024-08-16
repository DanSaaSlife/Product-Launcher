let budget = 100000;
let month = 1;
let users = 0;
let revenue = 0;
const maxMonths = 12;

const features = [
    { name: "Basic Feature", cost: 20000, time: 1, impact: 1000 },
    { name: "Advanced Feature", cost: 40000, time: 2, impact: 3000 },
    { name: "Premium Feature", cost: 60000, time: 3, impact: 5000 },
];

function updateUI() {
    document.getElementById('budget').textContent = `Budget: $${budget}`;
    document.getElementById('month').textContent = `Month: ${month}`;
    document.getElementById('marketing-value').textContent = `$${document.getElementById('marketing-budget').value}`;
}

function initFeatures() {
    const featuresContainer = document.getElementById('features');
    features.forEach((feature, index) => {
        const button = document.createElement('button');
        button.textContent = `${feature.name} - $${feature.cost}`;
        button.addEventListener('click', () => developFeature(index));
        featuresContainer.appendChild(button);
    });
}

function developFeature(index) {
    if (budget >= features[index].cost) {
        budget -= features[index].cost;
        users += features[index].impact;
        revenue += features[index].impact * 10;
        addFeedback(`Developed ${features[index].name}, gained ${features[index].impact} users.`);
        updateUI();
    } else {
        addFeedback('Not enough budget to develop this feature.');
    }
}

function addFeedback(message) {
    const feedbackContainer = document.getElementById('feedback-content');
    const feedbackItem = document.createElement('p');
    feedbackItem.textContent = message;
    feedbackContainer.appendChild(feedbackItem);
}

document.getElementById('end-turn').addEventListener('click', () => {
    month++;
    const marketingSpend = parseInt(document.getElementById('marketing-budget').value, 10);
    if (budget >= marketingSpend) {
        budget -= marketingSpend;
        users += marketingSpend / 100;
        revenue += marketingSpend / 10;
        addFeedback(`Spent $${marketingSpend} on marketing, gained ${marketingSpend / 100} users.`);
    } else {
        addFeedback('Not enough budget for marketing.');
    }
    
    if (month > maxMonths || budget <= 0) {
        endGame();
    }
    
    updateUI();
});

function endGame() {
    document.getElementById('end-turn').disabled = true;
    if (users >= 50000 && revenue >= 500000) {
        addFeedback('Congratulations! You successfully launched the SaaS product.');
    } else {
        addFeedback('Game Over. You did not meet the launch targets.');
    }
}

initFeatures();
updateUI();
