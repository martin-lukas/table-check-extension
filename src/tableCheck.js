const CHECKBOX_CLASS = "checkbox-known";
const CHECKBOXES_LOCAL_STORAGE_ID = "checkboxesKnown";

const CHECKED_ROW_COLOR = "#BDF09B";
const DEFAULT_ROW_BG_COLOR = "white";

const CHECKBOX_SCALE = 2.0;
const COL_WIDTH = 55;

let rowBgColor = DEFAULT_ROW_BG_COLOR;

window.onload = () => {
    console.log("Running script...");
    const handleTableClick = (event) => {
        const tableElem = event.target.closest("table");
        if (!tableElem) {
            return;
        }

        if (!tableElem.classList.contains("table-check-enabled")) {
            tableElem.classList.add("table-check-enabled");
            let counter = 0;
            
            const thead = tableElem.getElementsByTagName("thead")[0];
            if (thead) {
                const headerRows = thead.children;
                for (const row of headerRows) {
                    addCheckboxToRow(row, `c${counter++}`, true);
                }
            }
        
            // Add checkboxes to table body
            const tbody = tableElem.getElementsByTagName("tbody")[0];
            const bodyRows = tbody.children;
            for (const row of bodyRows) {
                addCheckboxToRow(row, `c${counter++}`, false);
            }
        }
    }
    
    document.body.addEventListener("click", handleTableClick);
};

function addCheckboxToRow(row, checkboxId, isHeader) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;
    checkbox.id = checkboxId;
    checkbox.className = CHECKBOX_CLASS;
    checkbox.addEventListener("change", handleCheckboxClick);
    checkbox.style.transform = `scale(${CHECKBOX_SCALE})`;

    const cell = document.createElement(isHeader ? "th": "td");
    cell.style.textAlign = "center";
    cell.style.whiteSpace = "no-wrap";
    cell.style.width = `${COL_WIDTH}px`;
    cell.appendChild(checkbox);

    row.insertBefore(cell, row.firstElementChild);
}

function handleCheckboxClick(event) {
    const newValue = event.target?.checked;
    
    // Try to color the row based on the new value
    if (event.target.parentNode?.parentNode) {
        colorRow(event.target.parentNode?.parentNode, newValue);
    }
    
    // Try to save the new checkbox state to storage
    const checkboxValues = getCheckboxValuesFromStorage();
    
    if (!checkboxValues) {
        console.error("Checkboxes haven't been properly populated.");
        return false;
    } else {
        checkboxValues[Number(event.target.id.substring(1))] = newValue;
        setCheckboxValuesToStorage(checkboxValues);
        return true;
    }
}

function populateCheckboxes() {
    const checkboxes = document.getElementsByClassName(CHECKBOX_CLASS);   

    let checkboxValues = getCheckboxValuesFromStorage();
    if (!checkboxValues) {
        checkboxValues = Array(checkboxes.length).fill(false);
        setCheckboxValuesToStorage(checkboxValues);
    }

    for (let i = 0; i < checkboxes.length; i++) {
        const checkboxElem = checkboxes[i];
        checkboxElem.checked = checkboxValues[i];
        if (checkboxes[i].parentNode?.parentNode) {
            colorRow(checkboxes[i].parentNode?.parentNode, checkboxValues[i]);
        }
    }
}

function getCheckboxValuesFromStorage() {
    const checkboxValuesInStorage = window.localStorage.getItem(CHECKBOXES_LOCAL_STORAGE_ID);
    return checkboxValuesInStorage ? JSON.parse(checkboxValuesInStorage) : null;
}

function setCheckboxValuesToStorage(checkboxValues) {
    window.localStorage.setItem(CHECKBOXES_LOCAL_STORAGE_ID, JSON.stringify(checkboxValues));
}

function colorRow(rowElem, isChecked) {
    rowElem.style.backgroundColor = isChecked ? CHECKED_ROW_COLOR : rowBgColor;
    for (const cell of rowElem.children) {
        cell.style.backgroundColor = isChecked ? CHECKED_ROW_COLOR : rowBgColor;
    }
}