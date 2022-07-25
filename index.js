const possibleSolutions = [
    {
        Solution: {"Participants": "online", "Platform": "interactio", "Onsite": "listener+app", "Online": "interactio", "Interpreters": "online"},
        OnsiteSupportIncluded: false,
        InteractioTrainingTypeNeeded: "Interactio Full",
        Output: "Interactio Full Solution"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": ["interactio", "zoom", "teams", "other"], "Onsite": ["listener+app", "hardware", "unknown"], "Online": ["interactio", "zoom", "teams", "listener+app"], "Interpreters": "onsite"},
        OnsiteSupportIncluded: true,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Combine C2"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": ["interactio", "zoom", "teams", "other"], "Onsite": ["listener+app", "hardware", "unknown"], "Online": ["interactio", "zoom", "teams", "listener+app"], "Interpreters": "online+onsite"},
        OnsiteSupportIncluded: true,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Combine C3"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": ["interactio", "zoom", "teams", "other"], "Onsite": ["listener+app", "hardware", "unknown"], "Online": ["interactio", "zoom", "teams", "listener+app"], "Interpreters": "onsite+hub"},
        OnsiteSupportIncluded: true,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Combine C4"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": ["interactio", "zoom", "teams", "other"], "Onsite": ["listener+app", "hardware", "unknown"], "Online": ["interactio", "zoom", "teams", "listener+app"], "Interpreters": "online+onsite+hub"},
        OnsiteSupportIncluded: true,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Combine C5"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": "zoom", "Onsite": "listener+app", "Online": "zoom", "Interpreters": "online"},
        OnsiteSupportIncluded: false,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Restream: Zoom+"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": "other", "Onsite": "listener+app", "Online": "zoom", "Interpreters": "online"},
        OnsiteSupportIncluded: false,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Restream"
    },
    {
        Solution: {"Participants": ["online", "onsite", "hybrid"], "Platform": "teams", "Onsite": "listener+app", "Online": "teams", "Interpreters": "online"},
        OnsiteSupportIncluded: false,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Restream: Teams+"
    },
    {
        Solution: {"Participants": "onsite", "Platform": "interactio", "Onsite": "listener+app", "Online": "interactio", "Interpreters": "online"},
        OnsiteSupportIncluded: false,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Onsite"
    },
    {
        Solution: {"Participants": "hybrid", "Platform": "interactio", "Onsite": "listener+app", "Online": "interactio", "Interpreters": "online"},
        OnsiteSupportIncluded: false,
        InteractioTrainingTypeNeeded: "Interactio Master",
        Output: "Onsite"
    }
];

let userSelection = {"Participants": null, "Platform": null, "Onsite": null, "Online": null, "Interpreters": null};


//MAIN INPUT
function ValidateUserInput(nameOfSelector) {

    switch(nameOfSelector) {
        case "participants":
            const participatsSelector = document.getElementById(nameOfSelector);
            userSelection.Participants = participatsSelector.value;
            InteractWithSelectors(userSelection.Participants, userSelection.Platform);
            break;
        case "platform":
            const platformSelector = document.getElementById(nameOfSelector);
            userSelection.Platform = platformSelector.value;
            InteractWithSelectors(userSelection.Participants, userSelection.Platform);
            break;
        case "onsite":
            const onsiteSelector = document.getElementById(nameOfSelector);
            userSelection.Onsite = onsiteSelector.value;
            break;
        case "online":
            const onlineSelector = document.getElementById(nameOfSelector);
            userSelection.Online = onlineSelector.value;
            break;
        case "interpreters":
            const interpretersSelector = document.getElementById(nameOfSelector);
            userSelection.Interpreters = interpretersSelector.value;
            break;
    }

    if(UserInputIsCompleted()) {DisplayAnswer()};
}

function UserInputIsCompleted() {

    for(let property in userSelection) {

        if(userSelection[property] === null) {

            return false;

        }
    }

    return true;
}

function DisplayAnswer() {

    const defaultAnswer = "Check With TSEU";

    const meetingTypeHTMLElement = document.getElementById("answer");
    const onsiteSupportHTMLelement = document.getElementById("onsite+support");
    const trainingTypeHTMLelement = document.getElementById("training+type");

    const expectedNumberOfRightAnswers = 5;

    for (let index = 0; index < possibleSolutions.length; index++) {

        let currentSolution = possibleSolutions[index];

        let matchingAnswers = [];

        for(let property in currentSolution.Solution) {

            if(Array.isArray(currentSolution.Solution[property])) {

                if(currentSolution.Solution[property].some((element) => element === userSelection[property])) {

                    matchingAnswers.push(true);

                } else {

                    break; 

                }

            } else {

                if(currentSolution.Solution[property] === userSelection[property]) {

                    matchingAnswers.push(true);

                } else {

                    break;

                }

            }
        }

        if(matchingAnswers.length === expectedNumberOfRightAnswers) {

            meetingTypeHTMLElement.textContent = currentSolution.Output;
            (currentSolution.OnsiteSupportIncluded) ? onsiteSupportHTMLelement.textContent = "Onsite support is included in this solution package" : onsiteSupportHTMLelement.textContent = "Onsite support is not included in this solution package";
            trainingTypeHTMLelement.textContent = currentSolution.InteractioTrainingTypeNeeded;
            return;

        };
    }

    meetingTypeHTMLElement.textContent = defaultAnswer;
    onsiteSupportHTMLelement.textContent = defaultAnswer;
}

function InteractWithSelectors(participantsValue, platformValue) {

    let onsiteSelector = document.getElementById("onsite");
    let onlineSelector = document.getElementById("online");

    (participantsValue == "online" && platformValue == "interactio") ? DisableSelectors(onsiteSelector, onlineSelector) : EnableSelectors(onsiteSelector, onlineSelector);
}

function DisableSelectors(onsiteSelector, onlineSelector) {

    let onsiteValueString = "listener+app";
    let onlineValueString = "interactio";

    onsiteSelector.value = onsiteValueString;
    userSelection.Onsite = onsiteValueString;
    onsiteSelector.disabled = true;

    
    onlineSelector.value = onlineValueString;
    userSelection.Online = onlineValueString;
    onlineSelector.disabled = true;
}

function EnableSelectors(onsiteSelector, onlineSelector) {

    onsiteSelector.disabled = false;
    onlineSelector.disabled = false;
}