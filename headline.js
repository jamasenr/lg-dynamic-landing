
document.addEventListener('DOMContentLoaded', function() {
    // Configuration object for headlines
    const headlineConfig = {
        default: 'Discover How to Skyrocket Your Business with Ads That Convert Like Crazy – <b>In Just 5 Days, for FREE!</b>',
        '1': {
            ref1: 'Maximize Your Sales with Proven Ad Strategies – <b>Results in 5 Days, FREE!</b>',
            ref2: 'Increase Your Online Presence with Expert Ads – <b>In Just 5 Days, FREE!</b>',
            default: 'Maximize Your Impact with Ads That Work – <b>In Just 5 Days, FREE!</b>'
        },
        '2': {
            ref1: 'Generate High-Quality Leads with Our Ad Techniques – <b>Boost in 5 Days, FREE!</b>',
            ref2: 'Get More Clients with Our Ad Solutions – <b>Results in 5 Days, FREE!</b>',
            default: 'Generate Quality Leads with Precision Ads – <b>In Just 5 Days, FREE!</b>'
        },
        '3': {
            ref1: 'Accelerate Your Brand Growth with Targeted Ads – <b>Transform in 5 Days, FREE!</b>',
            ref2: 'Enhance Your Marketing with Custom Ads – <b>Transform in 5 Days, FREE!</b>',
            default: 'Grow Your Brand with Effective Ads – <b>In Just 5 Days, FREE!</b>'
        }
        // Add more utm_content and ref options as needed
    };

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param) || '';
    }

    function setHeadline(utmContent, ref) {
        const headlineElement = document.getElementById('headline');
        let headline = headlineConfig.default;

        if (headlineConfig[utmContent]) {
            if (headlineConfig[utmContent][ref]) {
                headline = headlineConfig[utmContent][ref];
            } else {
                headline = headlineConfig[utmContent].default || headlineConfig.default;
            }
        }

        headlineElement.innerHTML = headline;
        localStorage.setItem('headline', headline);
        updateHeadlineHistory(headline);
    }

    function updateHeadlineHistory(newHeadline) {
        let history = JSON.parse(localStorage.getItem('headlineHistory')) || [];
        let currentVisit = parseInt(localStorage.getItem('visitCount')) || 0;
        currentVisit++;
        localStorage.setItem('visitCount', currentVisit);

        if (history.length > 0) {
            let lastEntry = history[history.length - 1];
            if (lastEntry.headline === newHeadline) {
                lastEntry.visitEnd = currentVisit;
                lastEntry.count++;
            } else {
                history.push({
                    visitStart: currentVisit,
                    visitEnd: currentVisit,
                    headline: newHeadline,
                    count: 1
                });
            }
        } else {
            history.push({
                visitStart: currentVisit,
                visitEnd: currentVisit,
                headline: newHeadline,
                count: 1
            });
        }

        localStorage.setItem('headlineHistory', JSON.stringify(history));
        console.log('Headline History:', history);
    }

    const utmContent = getQueryParam('utm_content');
    const ref = getQueryParam('ref');
    if (utmContent || ref) {
        setHeadline(utmContent, ref);
    } else {
        const storedHeadline = localStorage.getItem('headline');
        if (storedHeadline) {
            document.getElementById('headline').innerHTML = storedHeadline;
            updateHeadlineHistory(storedHeadline);
        } else {
            setHeadline('', '');  // Default headline if no UTM and no stored headline
        }
    }
});
