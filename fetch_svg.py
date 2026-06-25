import urllib.request

url = "https://upload.wikimedia.org/wikipedia/commons/4/4b/Vietnam_location_map.svg"
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    }
)

try:
    with urllib.request.urlopen(req) as response:
        with open("public/vietnam.svg", "wb") as f:
            f.write(response.read())
    print("Downloaded vietnam.svg")
except Exception as e:
    print("Error:", e)
