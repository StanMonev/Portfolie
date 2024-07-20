const divider = document.querySelector('.divider');
let isDragging = false;

function getInputDate(date){
    var now = new Date(date);

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    return now.getFullYear()+"-"+(month)+"-"+(day) ;
}

// Function to set initial widths based on saved values or default to middle
function setInitialWidths() {
    const container = divider.parentNode;
    const leftPanel = container.querySelector('.left');
    const rightPanel = container.querySelector('.right');
    const savedLeftWidth = localStorage.getItem('leftPanelWidth');
    const savedRightWidth = localStorage.getItem('rightPanelWidth');
    const containerWidth = container.clientWidth;

    if (savedLeftWidth && savedRightWidth) {
        leftPanel.style.width = savedLeftWidth;
        rightPanel.style.width = savedRightWidth;
    } else {
        const middleWidth = containerWidth / 2;
        leftPanel.style.width = middleWidth;
        rightPanel.style.width = middleWidth;
    }
}

// Set the initial widths when the page loads
setInitialWidths();

divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const container = divider.parentNode;
    const leftPanel = container.querySelector('.left');
    const rightPanel = container.querySelector('.right');

    let newLeftWidth = e.clientX - container.offsetLeft;

    // Ensure panels don't shrink beyond a minimum width
    if (newLeftWidth > 100 && newLeftWidth < container.clientWidth - 100) {
        leftPanel.style.width = newLeftWidth + 'px';
        rightPanel.style.width = (container.clientWidth - newLeftWidth) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        const container = divider.parentNode;
        const leftPanel = container.querySelector('.left');
        const rightPanel = container.querySelector('.right');

        // Save the current widths to local storage
        localStorage.setItem('leftPanelWidth', leftPanel.style.width);
        localStorage.setItem('rightPanelWidth', rightPanel.style.width);
    }
    isDragging = false;
    document.body.style.userSelect = ''; // Re-enable text selection
});

document.addEventListener('DOMContentLoaded', function() {
    fetchResumeData();
    fetchWorkExperiences();
    fetchEducations();
    fetchProjects();

    // Add event listeners to handle the still working/studying checkboxes
    document.getElementById('stillWorking').addEventListener('change', toggleJobEndDate);
    document.getElementById('stillStudying').addEventListener('change', toggleEducationEndDate);
});

function fetchResumeData() {
    fetch('/api/resume')
        .then(response => {
            if (!response.ok) {
                throw new Error('No resume found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('firstName').value = data.first_name || '';
            document.getElementById('lastName').value = data.last_name || '';
            document.getElementById('town').value = data.town || '';
            document.getElementById('country').value = data.country || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('linkedin').value = data.linkedin || '';
            document.getElementById('github').value = data.github || '';
            document.getElementById('website').value = data.website || '';
            document.getElementById('skills').value = data.skills || '';
            document.getElementById('interests').value = data.interests || '';
        })
        .catch(error => {
            console.warn(error.message);
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('town').value = '';
            document.getElementById('country').value = '';
            document.getElementById('email').value = '';
            document.getElementById('linkedin').value = '';
            document.getElementById('github').value = '';
            document.getElementById('website').value = '';
            document.getElementById('skills').value = '';
            document.getElementById('interests').value = '';
        });
}

function saveOrUpdateResume() {
    const requiredFields = ['firstName', 'lastName', 'town', 'country', 'email', 'skills'];
    const resumeData = {};

    for (let field of requiredFields) {
        const value = document.getElementById(field).value.trim();
        if (!value) {
            alert(`${field.replace(/([A-Z])/g, ' $1')} is required.`);
            return;
        }
        resumeData[field] = value;
    }

    resumeData.linkedin = document.getElementById('linkedin').value;
    resumeData.github = document.getElementById('github').value;
    resumeData.website = document.getElementById('website').value;
    resumeData.interests = document.getElementById('interests').value;

    fetch('/api/resume/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('saveResume').addEventListener('click', saveOrUpdateResume);

// Toggle Job End Date based on Still Working checkbox
function toggleJobEndDate() {
    const jobEndDate = document.getElementById('jobEndDate');
    jobEndDate.disabled = this.checked;
    if (this.checked) {
        jobEndDate.value = '';
    }
}

// Toggle Education End Date based on Still Studying checkbox
function toggleEducationEndDate() {
    const educationUntil = document.getElementById('educationUntil');
    educationUntil.disabled = this.checked;
    if (this.checked) {
        educationUntil.value = '';
    }
}

// Fetch and display work experiences
function fetchWorkExperiences() {
    fetch('/api/resume/work-experiences')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('workExperienceList');
            list.innerHTML = ''; // Clear existing entries
            if (data.length === 0) {
                const item = document.createElement('div');
                item.classList.add('no-work-experience');
                item.textContent = 'No work experiences available.';
                list.appendChild(item);
            } else {
                data.forEach(exp => {
                    console.log(exp);
                    const item = document.createElement('div');
                    item.classList.add('work-experience-item');
                    item.innerHTML = `
                        <h4>${exp.job_title}</h4>
                        <p>${exp.job_description}</p>
                        <p>${new Date(exp.job_begin_date).toDateString()} - ${exp.still_working ? 'Present' : new Date(exp.job_end_date).toDateString()}</p>
                        <button onclick="editWorkExperience(${exp.id})">Edit</button>
                        <button onclick="deleteWorkExperience(${exp.id})">Delete</button>
                    `;
                    list.appendChild(item);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function saveOrUpdateWorkExperience() {
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const jobDescription = document.getElementById('jobDescription').value.trim();
    const jobBeginDate = document.getElementById('jobBeginDate').value;
    const stillWorking = document.getElementById('stillWorking').checked;
    const jobEndDate = stillWorking ? null : document.getElementById('jobEndDate').value;

    if (!jobTitle || !jobDescription || !jobBeginDate || (!stillWorking && !jobEndDate)) {
        alert('All fields are required except Job End Date if still working is checked.');
        return;
    }

    const workExperienceData = {
        id: document.getElementById('workExperienceId').value,
        jobTitle,
        jobDescription,
        jobBeginDate,
        stillWorking,
        jobEndDate
    };

    fetch('/api/resume/work-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workExperienceData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchWorkExperiences(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

function editWorkExperience(id) {
    fetch(`/api/resume/work-experience/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('workExperienceId').value = data.id;
            document.getElementById('jobTitle').value = data.job_title;
            document.getElementById('jobDescription').value = data.job_description;
            document.getElementById('jobBeginDate').value = getInputDate(data.job_begin_date);
            document.getElementById('stillWorking').checked = data.still_working;
            document.getElementById('jobEndDate').value = getInputDate(data.job_end_date);
            toggleJobEndDate.call(document.getElementById('stillWorking'));
        })
        .catch(error => console.error('Error:', error));
}

function deleteWorkExperience(id) {
    fetch('/api/resume/work-experience', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchWorkExperiences(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('addWorkExperienceButton').addEventListener('click', saveOrUpdateWorkExperience);

// Fetch and display educations
function fetchEducations() {
    fetch('/api/resume/educations')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('educationList');
            list.innerHTML = ''; // Clear existing entries
            if (data.length === 0) {
                const item = document.createElement('div');
                item.classList.add('no-education');
                item.textContent = 'No educations available.';
                list.appendChild(item);
            } else {
                data.forEach(edu => {
                    const item = document.createElement('div');
                    item.classList.add('education-item');
                    item.innerHTML = `
                        <h4>${edu.name}</h4>
                        <p>${edu.description}</p>
                        <p>${new Date(edu.from_date).toDateString()} - ${edu.still_studying ? 'Present' : new Date(edu.until_date).toDateString()}</p>
                        <button onclick="editEducation(${edu.id})">Edit</button>
                        <button onclick="deleteEducation(${edu.id})">Delete</button>
                    `;
                    list.appendChild(item);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function saveOrUpdateEducation() {
    const name = document.getElementById('educationName').value.trim();
    const description = document.getElementById('educationDescription').value.trim();
    const fromDate = document.getElementById('educationFrom').value;
    const stillStudying = document.getElementById('stillStudying').checked;
    const untilDate = stillStudying ? null : document.getElementById('educationUntil').value;

    if (!name || !description || !fromDate || (!stillStudying && !untilDate)) {
        alert('All fields are required except Until Date if still studying is checked.');
        return;
    }

    const educationData = {
        id: document.getElementById('educationId').value,
        name,
        description,
        fromDate,
        stillStudying,
        untilDate
    };

    fetch('/api/resume/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(educationData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchEducations(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

function editEducation(id) {
    fetch(`/api/resume/education/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('educationId').value = data.id;
            document.getElementById('educationName').value = data.name;
            document.getElementById('educationDescription').value = data.description;
            document.getElementById('educationFrom').value = getInputDate(data.from_date);
            document.getElementById('stillStudying').checked = data.still_studying;
            document.getElementById('educationUntil').value = getInputDate(data.until_date);
            toggleEducationEndDate.call(document.getElementById('stillStudying'));
        })
        .catch(error => console.error('Error:', error));
}

function deleteEducation(id) {
    fetch('/api/resume/education', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchEducations(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('addEducationButton').addEventListener('click', saveOrUpdateEducation);

// Fetch and display projects
function fetchProjects() {
    fetch('/api/resume/projects')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('projectList');
            list.innerHTML = ''; // Clear existing entries
            if (data.length === 0) {
                const item = document.createElement('div');
                item.classList.add('no-projects');
                item.textContent = 'No projects available.';
                list.appendChild(item);
            } else {
                data.forEach(proj => {
                    const item = document.createElement('div');
                    item.classList.add('project-item');
                    item.innerHTML = `
                        <h4>${proj.name}</h4>
                        <p>${proj.description}</p>
                        <button onclick="editProject(${proj.id})">Edit</button>
                        <button onclick="deleteProject(${proj.id})">Delete</button>
                    `;
                    list.appendChild(item);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function saveOrUpdateProject() {
    const name = document.getElementById('projectName').value.trim();
    const description = document.getElementById('projectDescription').value.trim();

    if (!name || !description) {
        alert('All fields are required.');
        return;
    }

    const projectData = {
        id: document.getElementById('projectId').value,
        name,
        description
    };

    fetch('/api/resume/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchProjects(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

function editProject(id) {
    fetch(`/api/resume/project/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('projectId').value = data.id;
            document.getElementById('projectName').value = data.name;
            document.getElementById('projectDescription').value = data.description;
        })
        .catch(error => console.error('Error:', error));
}

function deleteProject(id) {
    fetch('/api/resume/project', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchProjects(); // Refresh the list
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('addProjectButton').addEventListener('click', saveOrUpdateProject);
