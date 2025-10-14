const toggleBtn = document.getElementById("toggleFormBtn");
  const formContainer = document.getElementById("formContainer");
  const postList = document.getElementById("postList");
  const overlay = document.getElementById("formOverlay");

  // Load saved projects
  window.addEventListener("DOMContentLoaded", loadPosts);

  // 🔹 Toggle popup form
  toggleBtn.addEventListener("click", () => {
    formContainer.style.display = "flex";
    overlay.style.display = "block";
  });

  // 🔹 Hide popup when overlay clicked
  overlay.addEventListener("click", () => {
    formContainer.style.display = "none";
    overlay.style.display = "none";
  });

  // 🔹 Add Post
  function addPost() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageInput = document.getElementById("imageInput");

    if (!title || !content) {
      alert("Please fill in all fields!");
      return;
    }

    const newPost = { title, content, image: "" };

    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newPost.image = e.target.result;
        savePost(newPost);
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      savePost(newPost);
    }

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    imageInput.value = "";

    formContainer.style.display = "none";
    overlay.style.display = "none";
  }

  // 🔹 Save Post
  function savePost(post) {
    const posts = JSON.parse(localStorage.getItem("projects")) || [];
    posts.push(post);
    localStorage.setItem("projects", JSON.stringify(posts));
    displayPost(post, posts.length - 1);
  }

  // 🔹 Load Posts
  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("projects")) || [];
    posts.forEach((post, index) => displayPost(post, index));
  }

  // 🔹 Display Post
  function displayPost(post, index) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    let imageHTML = "";
    if (post.image) {
      imageHTML = `<img src="${post.image}" alt="${post.title}">`;
    }

    const postContent = `
      <div class="post-content">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onclick="deletePost(${index})" 
          style="background-color:#c0392b; color:white; border:none;
          padding:5px 10px; border-radius:5px; margin-top:10px; cursor:pointer;">
          Delete
        </button>
      </div>
    `;

    postDiv.innerHTML = imageHTML + postContent;
    postList.appendChild(postDiv);
  }

  // 🔹 Delete Post
  function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem("projects")) || [];
    posts.splice(index, 1);
    localStorage.setItem("projects", JSON.stringify(posts));
    postList.innerHTML = "";
    loadPosts();
  }

  function openTab(evt, tabName) {
      let i, tabcontent, tablinks;

      // Hide all tab contents
      tabcontent = document.getElementsByClassName("tab-content");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Remove "active" class from all tabs
      tablinks = document.getElementsByClassName("tab-link");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
      }

      // Show selected tab
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.classList.add("active");
    }