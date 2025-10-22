const urlParams = new URLSearchParams(window.location.search);
const CIK = urlParams.get('CIK') || '0001364742';
const apiUrl = `https://data.sec.gov/api/xbrl/companyconcept/CIK${CIK}/dei/EntityCommonStockSharesOutstanding.json`;

fetch(apiUrl, { headers: { 'User-Agent': 'YourAppName/1.0' } })
    .then(response => response.json())
    .then(data => {
        const entityName = data.entityName;
        const shares = data.units.shares.filter(entry => entry.fy > '2020' && typeof entry.val === 'number');
        const max = shares.reduce((prev, current) => (prev.val > current.val) ? prev : current);
        const min = shares.reduce((prev, current) => (prev.val < current.val) ? prev : current);

        document.title = entityName;
        document.getElementById('share-entity-name').innerText = entityName;
        document.getElementById('share-max-value').innerText = max.val;
        document.getElementById('share-max-fy').innerText = max.fy;
        document.getElementById('share-min-value').innerText = min.val;
        document.getElementById('share-min-fy').innerText = min.fy;
    })
    .catch(error => console.error('Error fetching data:', error));
