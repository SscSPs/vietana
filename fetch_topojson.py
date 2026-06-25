import urllib.request
import json

url = "https://code.highcharts.com/mapdata/countries/vn/vn-all.topo.json"
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3)'
    }
)

try:
    with urllib.request.urlopen(req) as response:
        data = response.read()
        with open("public/vietnam.topo.json", "wb") as f:
            f.write(data)
    print("Downloaded vietnam.topo.json successfully.")
except Exception as e:
    print("Error:", e)
