// Fetch and display data
let fetchData = async () => {
    let url = "http://localhost:3000/student";
    let data = [];
  
    try {
      let res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
      return;
    }
  
    let table = document.querySelector("#showdata");
    if (!table) return;
  
    table.innerHTML = "";
    data.forEach((e) => {
      table.innerHTML += `
        <tr>
          <td>${e.name}</td>
          <td>${e.contact}</td>
          <td>${e.country}</td>
          <td>${e.age}</td>
          <td>${e.gmail}</td>
          <td onclick="del('${e.id}')">Delete</td>
          <td onclick="formfill('${e.id}')">Update</td>
        </tr>`;
    });
  };
  
  // Delete student
  let del = (id) => {
    fetch(`http://localhost:3000/student/${id}`, { method: "DELETE" })
      .then(() => fetchData());
  };
  
  // Add new student
  let book = () => {
    let name = document.querySelector("#name").value;
    let contact = document.querySelector("#contact").value;
    let country = document.querySelector("#country").value;
    let age = document.querySelector("#age").value;
    let gmail = document.querySelector("#gmail").value;
  
    fetch("http://localhost:3000/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, country, age, gmail })
    }).then(() => {
      window.location.href = "prac.html";
    }).catch(err => console.error(err));
  };
  
  // Update form fill
  let formfill = async (id) => {
    let url = `http://localhost:3000/student/${id}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      let container = document.querySelector("#formcontainer");
  
      container.innerHTML = `
        <h3>Update Student</h3>
        Enter Name: <input type="text" id="name" value="${data.name}"> <br><br>
        Enter Contact: <input type="number" id="contact" value="${data.contact}"> <br><br>
        Choose Country: 
        <select id="country">
          <option value="India">India</option>
          <option value="Usa">Usa</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
        </select> <br><br>
        Enter Age: <input type="number" id="age" value="${data.age}"> <br><br>
        Enter Gmail: <input type="text" id="gmail" value="${data.gmail}"> <br><br>
        <input type="hidden" id="id" value="${data.id}">
        <input type="submit" value="Update" onclick="return update()">
      `;
      document.querySelector("#country").value = data.country;
    } catch (err) {
      console.error("Form fill error:", err);
    }
  };
  
  // Update student
  let update = () => {
    let id = document.querySelector("#id").value;
    let updatedData = {
      name: document.querySelector("#name").value,
      contact: document.querySelector("#contact").value,
      country: document.querySelector("#country").value,
      age: document.querySelector("#age").value,
      gmail: document.querySelector("#gmail").value
    };
  
    fetch(`http://localhost:3000/student/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    }).then(() => window.location.href = "prac.html");
  };
  
  // Only call fetchData on prac.html
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#showdata")) fetchData();
  });
  