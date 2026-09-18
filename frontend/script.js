const API_URL = "https://nyc-airbnb-room-prediction-nvxw.onrender.com/predict";

const form = document.getElementById("predictionForm");

const predictBtn = document.getElementById("predictBtn");

const errorBox = document.getElementById("errorBox");

const emptyState = document.getElementById("emptyState");

const resultState = document.getElementById("resultState");

const predictionEl = document.getElementById("prediction");

const confidenceEl = document.getElementById("confidence");

const confidenceBar = document.getElementById("confidenceBar");

const confidenceBadge = document.getElementById("confidenceBadge");

const confidenceText = document.getElementById("confidenceText");

const probabilitiesEl = document.getElementById("probabilities");

const apiStatus = document.getElementById("apiStatus");



/*
    Demo values
*/

const demoData = {

    latitude: 40.7128,

    longitude: -74.0060,

    price: 150,

    minimum_nights: 2,

    number_of_reviews: 45,

    reviews_per_month: 1.8,

    calculated_host_listings_count: 3,

    availability_365: 180,

    neighbourhood_group: "Manhattan",

    neighbourhood: "Harlem"
};



/*
    Load Demo
*/

document
    .getElementById("demoBtn")
    .addEventListener("click", () => {

        Object.entries(demoData).forEach(
            ([key, value]) => {

                document.getElementById(key).value = value;

            }
        );

        clearError();

    });



/*
    Get numeric value
*/

function getNumber(id) {

    return Number(
        document.getElementById(id).value
    );

}



/*
    Create API payload
*/

function getPayload() {

    return {

        latitude:
            getNumber("latitude"),

        longitude:
            getNumber("longitude"),

        price:
            getNumber("price"),

        minimum_nights:
            getNumber("minimum_nights"),

        number_of_reviews:
            getNumber("number_of_reviews"),

        reviews_per_month:
            getNumber("reviews_per_month"),

        calculated_host_listings_count:
            getNumber(
                "calculated_host_listings_count"
            ),

        availability_365:
            getNumber("availability_365"),

        neighbourhood_group:
            document
                .getElementById(
                    "neighbourhood_group"
                )
                .value,

        neighbourhood:
            document
                .getElementById(
                    "neighbourhood"
                )
                .value
                .trim()
    };

}



/*
    Loading animation
*/

function setLoading(loading) {

    predictBtn.classList.toggle(
        "loading",
        loading
    );

    predictBtn.querySelector(
        ".button-text"
    ).textContent = loading
        ? "Analyzing Listing..."
        : "Predict Room Type";

}



/*
    Error handling
*/

function clearError() {

    errorBox.textContent = "";

    errorBox.classList.remove("show");

}



function showError(message) {

    errorBox.textContent = message;

    errorBox.classList.add("show");

}



/*
    Format prediction name
*/

function prettyClassName(name) {

    return String(name)
        .replace(/_/g, " ")
        .replace(
            /\b\w/g,
            letter => letter.toUpperCase()
        );

}



/*
    Confidence text
*/

function getConfidenceLevel(value) {

    if (value >= 80) {

        return {
            badge: "High Confidence",
            text: "Model is highly confident"
        };

    }

    if (value >= 60) {

        return {
            badge: "Good Confidence",
            text: "Model shows good confidence"
        };

    }

    if (value >= 40) {

        return {
            badge: "Moderate Confidence",
            text: "Prediction has moderate certainty"
        };

    }

    return {
        badge: "Low Confidence",
        text: "Prediction has lower certainty"
    };

}



/*
    Render probabilities
*/

function renderProbabilities(probabilities) {

    probabilitiesEl.innerHTML = "";


    /*
        IMPORTANT:

        Your current FastAPI does not return
        class names.

        These labels are placeholders based
        on the standard NYC Airbnb room types.

        Better approach:
        return model.classes_ from FastAPI.
    */

    const classNames = [
        "Entire Home / Apt",
        "Private Room",
        "Shared Room",
        "Hotel Room"
    ];


    probabilities.forEach(
        (probability, index) => {

            const percentage =
                probability * 100;


            const className =
                classNames[index] ||
                `Class ${index + 1}`;


            const row =
                document.createElement("div");


            row.className =
                "probability-row";


            row.innerHTML = `

                <div class="probability-meta">

                    <span>
                        ${className}
                    </span>

                    <span>
                        ${percentage.toFixed(1)}%
                    </span>

                </div>


                <div class="probability-track">

                    <div
                        class="probability-fill"
                        data-width="${percentage}"
                    ></div>

                </div>

            `;


            probabilitiesEl.appendChild(row);

        }
    );


    /*
        Animate bars after rendering
    */

    requestAnimationFrame(() => {

        document
            .querySelectorAll(
                ".probability-fill"
            )
            .forEach(bar => {

                bar.style.width =
                    `${bar.dataset.width}%`;

            });

    });

}



/*
    Render final prediction
*/

function renderResult(data) {

    const prediction =
        prettyClassName(
            data.prediction
        );


    predictionEl.textContent =
        prediction;


    /*
        Calculate confidence
        using highest probability
    */

    const probabilities =
        Array.isArray(data.probability)
            ? data.probability
            : [];


    const maxProbability =
        probabilities.length
            ? Math.max(...probabilities)
            : 0;


    const confidence =
        maxProbability * 100;


    confidenceEl.textContent =
        `${confidence.toFixed(1)}%`;


    /*
        Animate confidence bar
    */

    confidenceBar.style.width = "0%";


    setTimeout(() => {

        confidenceBar.style.width =
            `${confidence}%`;

    }, 100);


    /*
        Confidence status
    */

    const level =
        getConfidenceLevel(
            confidence
        );


    confidenceBadge.textContent =
        level.badge;


    confidenceText.textContent =
        level.text;


    /*
        Probability bars
    */

    renderProbabilities(
        probabilities
    );


    /*
        Switch UI
    */

    emptyState.classList.add(
        "hidden"
    );

    resultState.classList.remove(
        "hidden"
    );

}



/*
    Form submit
*/

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        clearError();


        const payload =
            getPayload();


        /*
            Basic validation
        */

        if (
            !payload.neighbourhood_group ||
            !payload.neighbourhood
        ) {

            showError(
                "Please select a neighbourhood group and enter a neighbourhood."
            );

            return;

        }


        setLoading(true);

        apiStatus.textContent =
            "Predicting...";


        try {

            const response =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                payload
                            )

                    }
                );


            if (!response.ok) {

                const error =
                    await response.text();

                throw new Error(
                    error ||
                    `API Error: ${response.status}`
                );

            }


            const data =
                await response.json();


            /*
                Render result
            */

            renderResult(data);


            apiStatus.textContent =
                "API Connected";


        }

        catch (error) {

            console.error(error);


            apiStatus.textContent =
                "API Offline";


            showError(
                "Unable to connect to FastAPI. Make sure your FastAPI server is running on port 8000."
            );

        }

        finally {

            setLoading(false);

        }

    }
);
