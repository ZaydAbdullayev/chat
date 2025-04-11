document.getElementById('tombstoneForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nickname = document.getElementById('nickname').value;
    const causeOfDeath = document.getElementById('causeOfDeath').value;

    // Update Tombstone Information
    document.getElementById('tombstoneNickname').textContent = nickname;
    document.getElementById('tombstoneCauseOfDeath').textContent = causeOfDeath;

    // Show Tombstone Result
    document.getElementById('tombstoneResult').classList.remove('hidden');
});

// Placeholder actions for buttons
document.getElementById('downloadBtn').addEventListener('click', function () {
    alert("Download functionality not implemented yet.");
});

document.getElementById('shareBtn').addEventListener('click', function () {
    const tweetText = "I died with my bags. Mint your $RIP tombstone now.";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
});
