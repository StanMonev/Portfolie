function splitTitle(title) {
    const parts = title.split('|');
    const mainTitle = parts[0];
    const subTitle = parts.length > 1 ? ' ' + parts[1].trim() : '';
    return [mainTitle, subTitle];
}

function formatList(text) {
    return text.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
}

function formatSkillsAndInterests(skills, interests) {
    return skills.split('\n').map(skill => `<li>${skill.trim()}</li>`).join('') + 
           interests.split('\n').map(interest => `<li>${interest.trim()}</li>`).join('');
}
