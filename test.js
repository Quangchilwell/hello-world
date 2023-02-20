// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Basic dHJhbmc6NDMyMQ==");
// myHeaders.append("Content-Type", "application/json");

const empList = document.querySelector(".emp-list");
// Lay danh sach nhan vien
function getEmpsList() {
    fetch("http://localhost:8080/emp-list")
    .then( function (response) {
      return response.json();
    }).then((emps) => {
        const htmls =  emps.map(function (emp) {
          return `<li>${emp.name}</li>
              <a href="http://127.0.0.1:5500/form.html?id=${emp.id}" >Sua</a>
              <form>
                  <button class="delete-emp" 
                      type="submit"
                      onclick="deleteEmp(${emp.id})"
                  >
                  Xoa</button>
              </form>
          `;
        });
          empList.innerHTML = htmls.join(""); 
    });
    }
    
    getEmpsList()
    

// Them moi
function createEmp(data){
    let options = {
        // method: 'POST',
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(data)
    }
    fetch("http://localhost:8080/add-emp", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(function(response){
            return response.json()
        })
        .catch(function(){
            console.log("Co loi")
        })
}

const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.onclick = function(e){
    e.preventDefault()
    let formData = {
        name: document.querySelector('input[name="name"]').value,
        age: document.querySelector('input[name="age"]').value,
        username: document.querySelector('input[name="username"]').value,
        password: document.querySelector('input[name="password"]').value,
        role: document.querySelector('input[name="role"]').value,
    }

    createEmp(formData)
    // alert('Thanh cong')
    getEmpsList()
}



// Cap nhat
// function updateEmpSuccess(id){
//     console.log(formData)
//     let options = {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//     }
//     fetch("http://localhost:8080/update-emp/" + id , options)
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(){
//         getEmpsList()
//     })
// }

// Xoa bo
function deleteEmp(id){
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    }
    fetch("http://localhost:8080/delete-emp/" + id , options)
        .then(function(response){
            return response.json()
        })
        .then(function(){
            getEmpsList()
        })
}


