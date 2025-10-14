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