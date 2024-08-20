/**
 * resumeDownload.js
 *
 * This script handles the generation and download of a resume as a PDF document.
 * It fetches the resume data from the server, updates the preview, and applies 
 * a watermark to the document before converting it into a PDF for download.
 *
 * Key functionalities:
 * - Fetch and display resume details, work experiences, education entries, and projects.
 * - Generate a PDF of the resume with a custom watermark.
 * - Handle user interactions like clicking the download button.
 */

document.addEventListener('DOMContentLoaded', function() {
    updatePreview();
});

/**
 * Event listener for the download button. When clicked, it generates a PDF of the resume with a watermark.
 * 
 * @returns {void}
 */
document.getElementById('downloadButton').addEventListener('click', function () {
    const element = document.getElementById('cvPreview');
    const style = document.createElement('style');

    style.textContent = `
        .watermark {
            position: relative;
        }

        .watermark::before {
            content: 'Copyright of Stanimir Monev';
            font-size: 50px;
            color: rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: rotate(-45deg);
            display: grid;
            place-items: center;
            pointer-events: none;
        }
    `;

    document.head.appendChild(style); // Add watermark style to the document

    const opt = {
        margin: 5,
        filename: 'StanimirMonevResume.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF and then remove the watermark style after the download
    html2pdf().set(opt).from(element).save().then(() => {
        document.head.removeChild(style);
    });
});

/**
 * Fetches the resume data from the server and updates the preview section with the latest information.
 * 
 * @returns {Promise<void>}
 */
async function updatePreview() {
    try {
        const data = await fetchData('/api/resume/admin');
        const firstName = data.first_name;
        const lastName = data.last_name;
        const town = data.town;
        const country = data.country;
        const email = data.email;
        const linkedin = data.linkedin;
        const github = data.github;
        const website = data.website;
        const skills = data.skills;
        const interests = data.interests;

        document.getElementById('previewName').textContent = `${firstName} ${lastName}`;    

        const contactInfo = [];
        if (town && country) contactInfo.push(`${town}, ${country}`);
        if (email) contactInfo.push(`<a href="mailto:${email}"><img src="/assets/images/gmail.png" class="icon" alt="Email Icon" /> E-Mail</a>`);
        if (linkedin) contactInfo.push(`<a href="${linkedin}" target="_blank"> <img src="/assets/images/linkedin.png" class="icon" alt="LinkedIn Icon" /> LinkedIn</a>`);
        if (github) contactInfo.push(`<a href="${github}" target="_blank"><img src="/assets/images/github.png" class="icon" alt="GitHub Icon" /> GitHub</a>`);
        if (website) contactInfo.push(`<a href="${website}" target="_blank"><img src="/assets/images/smworks_logo_cropped.png" class="icon" alt="Website Icon" /> www.stanimirmonevworks.com</a>`);

        document.getElementById('previewContact').innerHTML = contactInfo.join(' | ');
        document.getElementById('previewSkills').innerHTML = formatSkillsAndInterests(skills, interests);
    } catch (error) {
        console.error('Error:', error);
    }

    // Update other sections of the resume
    updateEducationPreview();
    updateProjectsPreview();
    updateWorkExperiencePreview();
}

/**
 * Fetches and displays the education entries associated with the resume in the preview section.
 * 
 * @returns {Promise<void>}
 */
async function updateEducationPreview() {
    try {
        const data = await fetchData('/api/resume/educations-admin');
        data.sort((a, b) => new Date(a.from_date) - new Date(b.from_date));

        const previewEducation = document.getElementById('previewEducation');
        previewEducation.innerHTML = '';
        data.forEach(edu => {
            const item = document.createElement('div');
            item.classList.add('education-item');

            const [mainTitle, subTitle] = splitTitle(edu.name);
            const fromDate = new Date(edu.from_date);
            const endDate = new Date(edu.until_date);
            const untilDate = edu.still_studying ? 'Present' : `${endDate.toLocaleString('default', { month: 'long' })}, ${endDate.getFullYear()}`;

            item.innerHTML = `
                <div>
                    <strong class="title-main">${mainTitle}</strong><span class="title-sub">${subTitle}</span>
                    <span class="dates">${fromDate.toLocaleString('default', { month: 'long' })}, ${fromDate.getFullYear()} - ${untilDate}</span>
                </div>
                <ul>${formatList(edu.description)}</ul>
            `;
            previewEducation.appendChild(item);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Fetches and displays the project entries associated with the resume in the preview section.
 * 
 * @returns {Promise<void>}
 */
async function updateProjectsPreview() {
    try {
        const data = await fetchData('/api/resume/projects-admin');
        const previewProjects = document.getElementById('previewProjects');
        previewProjects.innerHTML = '';
        data.forEach(proj => {
            const item = document.createElement('div');
            item.classList.add('project-item');
            const [mainTitle, subTitle] = splitTitle(proj.name);
            item.innerHTML = `
                <div>
                    <strong class="title-main">${mainTitle}</strong><span class="title-sub">${subTitle}</span>
                </div>
                <ul class="bullet-points">${formatList(proj.description)}</ul>
            `;
            previewProjects.appendChild(item);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Fetches and displays the work experience entries associated with the resume in the preview section.
 * 
 * @returns {Promise<void>}
 */
async function updateWorkExperiencePreview() {
    try {
        const data = await fetchData('/api/resume/work-experiences-admin');
        data.sort((a, b) => new Date(a.job_begin_date) - new Date(b.job_begin_date));

        const previewExperience = document.getElementById('previewExperience');
        previewExperience.innerHTML = '';
        data.forEach(exp => {
            const item = document.createElement('div');
            item.classList.add('experience-item');
            const beginDate = new Date(exp.job_begin_date);
            const endDate = new Date(exp.job_end_date);
            const endDateString = exp.still_working ? 'Present' : `${endDate.toLocaleString('default', { month: 'long' })}, ${endDate.getFullYear()}`;
            const [mainTitle, subTitle] = splitTitle(exp.job_title);
            item.innerHTML = `
                <div>
                    <strong class="title-main">${mainTitle}</strong><span class="title-sub">${subTitle}</span>
                    <span class="dates">${beginDate.toLocaleString('default', { month: 'long' })}, ${beginDate.getFullYear()} - ${endDateString}</span>
                </div>
                <ul>${formatList(exp.job_description)}</ul>
            `;
            previewExperience.appendChild(item);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
