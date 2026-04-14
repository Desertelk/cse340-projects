'use strict'

let allAccounts = []

window.addEventListener("DOMContentLoaded", function() {
    let url = "/account/getAccounts"

    fetch(url)
    .then(function (response) {
        if(response.ok) {
            return response.json()
        }
        throw Error("Network response was not Ok")
    })
    .then(function (data) {
        console.log(data)
        allAccounts = data
        buildAccountList(allAccounts)
    })
    .catch(function (error) {
        console.log("There was a problem:", error.message)
    })

    document.getElementById("filterFirst").addEventListener("input", filterAccounts)
    document.getElementById("filterLast").addEventListener("input", filterAccounts)
    document.getElementById("filterType").addEventListener("input", filterAccounts)
})

function buildAccountList(data) {
    let accountDisplay = document.getElementById("accountDisplay")

    
    let dataTable = '<table class="account-table">'
    dataTable += '<thead>'
    dataTable += '<tr><th>Name</th><th>Email</th><th>Role</th></tr>'
    dataTable += '</thead>'
    dataTable += '<tbody>'
    
    data.forEach(function (account) {
        dataTable += `<tr>`
        dataTable += `<td>${account.account_firstname} ${account.account_lastname}</td>`
        dataTable += `<td>${account.account_email}</td>`
        dataTable += `<td>
                        <form method="POST" action="/account/update-role" class="role-form">
                            <select name="account_type">
                                <option value="Client" ${account.account_type ==="Client" ? "selected" : ""}>Client</option>
                                <option value="Employee" ${account.account_type ==="Employee" ? "selected" : ""}>Employee</option>
                                <option value="Admin" ${account.account_type ==="Admin" ? "selected" : ""}>Admin</option>
                            </select>

                            <input type="hidden" name="account_id" value="${account.account_id}">

                        </form>
                    </td>`
        dataTable += `</tr>`
    })
    
    dataTable += '</tbody></table>'
    
    if (data.length === 0) {
        accountDisplay.innerHTML = "<p>No accounts found.</p>"
        return
    }
    accountDisplay.innerHTML = dataTable
}

function filterAccounts() {
    let first = document.getElementById("filterFirst").value.toLowerCase()
    let last = document.getElementById("filterLast").value.toLowerCase()
    let type = document.getElementById("filterType").value

    let filtered = allAccounts.filter(account => {
        return (
            account.account_firstname.toLowerCase().includes(first) &&
            account.account_lastname.toLowerCase().includes(last) &&
            (type === "" || account.account_type === type)
        )
    })
    buildAccountList(filtered)
}

function updateRole(account_id, newRole) {
    fetch("/account/update-role"), {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        }, 
    }
}

document.getElementById("saveAllRoles").addEventListener("click", function() {
    document.querySelectorAll(".role-form").forEach(form => {
        form.submit();
    })
})