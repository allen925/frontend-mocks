import '../scss/index.scss'; 

document.addEventListener('DOMContentLoaded', () => {
    const issues = document.querySelectorAll('.issue');
    const reversedIssues = [...issues].reverse();
    let currentIssueIndex = 0;
    let isThrottled = false;
    const links = document.querySelectorAll('a[href^="#issue"]');
    const colors = ['#5C8B9F', '#E0AD7A', '#648600', '#FECEDA', '#DC0171', '#0261C9', '#FFCC30']

    // no random color
    // const colors = Array.from(issues).map(issue => getRandomColor());
    // function getRandomColor() {
    //     const letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }




    //////////////////////////////////////
    ////////////// event listener ////////
    //////////////////////////////////////

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();

            let hashNumber = event.currentTarget.href.match(/#issue(\d+)/) ? parseInt(event.currentTarget.href.match(/#issue(\d+)/)[1]) - 1 : 0;
            jumpIssue(hashNumber, true);
        });
    });

    // initial entry
    handleHashNavigation()
    // only background color is changed, if want to add scrolling need navigation.addEventListener("navigate", (event) => {
    window.addEventListener('hashchange', handleHashNavigation);

    // Handle scroll direction
    window.addEventListener('wheel', event => {
        event.preventDefault();

        if (isThrottled) return;
        isThrottled = true;
        setTimeout(() => isThrottled = false, 500);

        const direction = event.deltaY > 0 ? 1 : -1;
        let newIndex = updateCurrentIssueIndex(direction)
        jumpIssue(newIndex)
    }, { passive: false });

    window.addEventListener('keydown', event => {
        if (event.key == "ArrowDown" || event.key == "ArrowUp") {
            event.preventDefault();

            const direction = event.key == "ArrowDown" ? 1 : event.key == "ArrowUp" ? -1 : 0
            let newIndex = updateCurrentIssueIndex(direction)
            jumpIssue(newIndex)
        }
    });
    const toggleIcon = document.querySelector('.menu__title');
    const toggleButton = document.querySelector('.toggle-button');

    function updateIconDirection() {
        if (window.innerWidth <= 768) {
            toggleIcon.classList.remove('fa-arrow-down');
            toggleIcon.classList.add('fa-arrow-up');
            toggleButton.style.borderRadius = '10px';
        } else {
            toggleIcon.classList.remove('fa-arrow-up');
            toggleIcon.classList.add('fa-arrow-down');
            toggleButton.style.borderRadius = '0 0 10px 10px';
        }
    }

    // Initialize the correct icon direction
    updateIconDirection();

    // Add event listener for window resize
    window.addEventListener('resize', updateIconDirection);
    toggleButton.addEventListener('click', () => {
        toggleIcon.classList.toggle('rotated');

        if (toggleButton.style.borderRadius === '10px') {
            toggleButton.style.transition = '';
            toggleButton.style.borderRadius = '0 0 10px 10px';
        } else {
            toggleButton.style.borderRadius = '10px';
            toggleButton.style.transition = 'border-radius 0.5s linear';
        }
    });

    //////////////////////////////////////
    ////////// mobile touch //////////////
    //////////////////////////////////////
    /*
    purpose: Assume in mobile that no wheel event, that a touch from start to end is a movement, there can be many scrolling in one movement. 
    Then, we have to think a way to define how to identify each scrolling in a movement. 
    I code it to be: if stop moving for 0.3 sec then scrolling is done, else only one scrolling would happen, 
    which means if your finger scrolls slowly non-stop there would only be one scrolling, 
    but if scrolls with small interval stopped, then there could be multi-scrolling in one movement. 
    */

    // [startY, endY] when touchmove
    let movement = [null, null];
    let movementTimeout = null;
    // 300 ms, touchmove refreshes the interval, until no refresh we finalize movement and ready for next touchmove scrolling. 
    const touchDelay = 300;

    document.addEventListener('touchstart', function (event) {
        const startY = event.touches[0].clientY;
        movement = [startY, null];
        resetMovementTimeout();
    }, false);

    document.addEventListener('touchmove', function (event) {
        event.preventDefault()
        const currentY = event.touches[0].clientY;

        if (movement[1] === null) {
            movement[1] = currentY;
            handleScreenMovement();
        } else
            movement[1] = currentY;
        resetMovementTimeout();
    }, { passive: false });

    document.addEventListener('touchend', function () {
        finalizeMovement();
    });

    // prepare for next iteration of touchmove
    function resetMovementTimeout() {
        clearMovementTimeout();
        movementTimeout = setTimeout(() => {
            finalizeMovement();
        }, touchDelay);
    }

    // clean up timeout
    function clearMovementTimeout() {
        if (movementTimeout) {
            clearTimeout(movementTimeout);
            movementTimeout = null;
        }
    }

    //  reaching end of touchmove
    function finalizeMovement() {
        if (movement[1] !== null) {
            console.log(`Movement from ${movement[0]} to ${movement[1]}`);
            movement = [movement[1], null]
        }
        clearMovementTimeout();
    }

    function handleScreenMovement() {
        const direction = movement[0] - movement[1] > 0 ? 1 : -1;
        let newIndex = updateCurrentIssueIndex(direction)
        jumpIssue(newIndex)
    }

    //////////////////////////////////////
    ////////// helper function ///////////
    //////////////////////////////////////

    // move between issues. newIndex starts from 0 to 6
    function jumpIssue(newIndex, hashchange = false) {
        if (newIndex !== currentIssueIndex || hashchange) {
            // console.log(reversedIssues[currentIssueIndex], reversedIssues[newIndex])
            updateBodyBackgroundColor(newIndex);

            links.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#issue${newIndex + 1}"]`);
            if (activeLink) activeLink.classList.add('active');

            requestAnimationFrame(() => {
                reversedIssues[newIndex].scrollIntoView({ behavior: 'smooth' });
            });
            currentIssueIndex = newIndex;
            const newHash = `#issue${currentIssueIndex + 1}`;
            window.history.pushState({}, '', newHash);
            // window.location.hash = newHash;
        }
    }

    // helper function, to update index based on scrolling direction
    function updateCurrentIssueIndex(direction) {
        if (direction >= 1 && currentIssueIndex > 0)
            // down
            return currentIssueIndex - 1;
        else if (direction <= -1 && currentIssueIndex < issues.length - 1)
            // up
            return currentIssueIndex + 1;
        return currentIssueIndex
    }

    // change background color
    function updateBodyBackgroundColor(nextIndex) {
        const endColor = colors[nextIndex];
        document.body.style.backgroundColor = endColor;
    }

    // ony triggers when change using url
    function handleHashNavigation(event) {
        if (event)
            event.preventDefault();
        // if null then to issue 1, else extract it and could be NaN
        let hashNumber = window.location.hash.match(/issue(\d+)/) ? parseInt(window.location.hash.match(/issue(\d+)/)[1]) - 1 : 0
        if (isNaN(hashNumber))
            hashNumber = 0
        else if (hashNumber > 6)
            hashNumber = 6
        jumpIssue(hashNumber, true);
    }
});

