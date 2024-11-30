// AJAX (Asynchronous JavaScript and XML) is a technique used in web development to send and
// retrieve data from a server asynchronously, without refreshing the entire web page. 
// This allows for dynamic and interactive user experiences by updating parts of the page without a full reload.

// Definition of AJAX:
// Asynchronous: Operations can occur independently of the main thread, allowing the page to remain interactive.
// JavaScript: The primary language used to implement AJAX.
// And
// XML: Originally used as the format for data exchange, but now JSON is more commonly used due to its simplicity.
// AJAX is commonly implemented using the XMLHttpRequest object or modern APIs like the Fetch API.

// Methods of AJAX (via XMLHttpRequest):
// open(method, URL, async):

// Initializes a new request.
// Parameters:
// method: HTTP method (e.g., "GET", "POST", "PUT", etc.).
// URL: The endpoint to which the request is sent.
// async (optional): Boolean indicating whether the request is asynchronous (default is true).
// send(data):

// Sends the request to the server.
// Parameter: data is optional and used to send payload (e.g., for POST requests).
// setRequestHeader(header, value):

// Sets the HTTP headers for the request.
// abort():

// Cancels the current request.
// getResponseHeader(header):

// Returns the value of the specified response header.
// getAllResponseHeaders():

// Returns all the response headers as a string.
// Properties of AJAX (XMLHttpRequest):
// readyState:

// Tracks the state of the request.
// Values:
// 0: UNSENT
// 1: OPENED
// 2: HEADERS_RECEIVED
// 3: LOADING
// 4: DONE

// status:
// The HTTP status code of the response (e.g., 200 for success, 404 for not found).

// statusText:
// The status message corresponding to the status code (e.g., "OK" for 200).

// responseText:
// Contains the server response as a string.

// responseXML:
// Contains the server response as XML (if applicable).

// onreadystatechange:
// An event handler triggered whenever the readyState changes.

// timeout:
// Specifies a timeout duration in milliseconds for the request.

// responseType:
// Specifies the type of response ("", "arraybuffer", "blob", "document", "json", "text").

// response:
// The response data, depending on responseType.

let req = new XMLHttpRequest()
req.open("GET", "https://jsonplaceholder.typicode.com/posts")
req.send()

req.onload(()=>{
    console.log(req.response)
})


// 1. Deep Understanding of XMLHttpRequest vs. Fetch API
// Question:
// Explain the differences between XMLHttpRequest and the Fetch API in terms of:

// Request streaming and response handling.
// How they deal with cross-origin resource sharing (CORS).
// Error handling for network errors, HTTP errors, and timeout scenarios.
// Performance implications for large payloads.
// Expected Answer:
// Candidates should highlight technical distinctions, such as the Fetch API's cleaner Promise-based syntax,
//  inability to detect HTTP errors (e.g., 404) directly without response.ok, and streaming capabilities. 
// They should discuss how each handles CORS, note that XMLHttpRequest has better backward compatibility, and 
// compare timeout handling (timeout in XMLHttpRequest vs. manual setup with AbortController in Fetch).

// 2. Optimizing AJAX for Real-Time Applications
// Question:
// How would you design an AJAX-based system to handle thousands of concurrent real-time updates
//  (e.g., stock prices or live scores) efficiently, ensuring minimal latency and avoiding browser
//  or server overload?

// Expected Answer:
// An ideal response would discuss using techniques like long polling, Server-Sent Events (SSE),
//  or WebSockets instead of traditional AJAX for real-time updates. Candidates should address scaling 
//  via techniques like load balancing, connection pooling, and efficient delta updates (sending only changes). 
//  They might also suggest using HTTP/2 for multiplexing and better concurrency management.

// 3. Debugging Complex AJAX Issues
// Question:
// You are building a multi-page application where AJAX requests intermittently fail, 
// showing a CORS error only for specific users in certain geolocations. How would you debug and resolve this issue?

// Expected Answer:
// Candidates should demonstrate systematic debugging skills:

// Reproduce the issue: Simulate requests from affected geolocations using VPNs or proxy tools.
// Inspect server-side CORS configuration: Ensure allowed origins are dynamic or sufficiently broad.
// Examine client-side headers: Check if misconfigured headers like Origin or custom headers trigger CORS failures.
// Analyze network conditions: Look for CDN misconfigurations or regional caching issues.
// They might suggest implementing a fallback mechanism or improving error logging for deeper insights.
// 4. AJAX Request Sequencing and Dependency Management
// Question:
// You have three dependent AJAX requests (A, B, C):

// A fetches a user profile.
// B depends on the result of A to fetch the user's posts.
// C depends on the combined results of A and B to fetch analytics.
// Write an optimized solution to manage these requests, ensuring minimal latency and maximum
//  readability in your code.
// Expected Answer:
// Candidates should provide a clean implementation using Promises or async/await. 
// Bonus points if they mention optimizations like starting request B while parsing 
// the response from A to save time or batching B and C where possible.


async function fetchUserAnalytics() {
  try {
    const userProfile = await fetch('/user/profile').then(res => res.json());
    const userPosts = await fetch(`/user/${userProfile.id}/posts`).then(res => res.json());
    const analytics = await fetch('/analytics', {
      method: 'POST',
      body: JSON.stringify({ user: userProfile, posts: userPosts }),
    }).then(res => res.json());
    return analytics;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }

}

// 5. Security Concerns and Mitigations
// Question:
// AJAX requests can expose sensitive information (e.g., user tokens) in headers or payloads.
// How would you design an AJAX-heavy web application to minimize security risks such as XSS, CSRF, and data exposure?

// Expected Answer:
// Candidates should discuss:

// XSS prevention: Use secure input/output encoding, sanitize user inputs, and implement Content Security Policy (CSP).
// CSRF protection: Implement anti-CSRF tokens validated server-side, use SameSite cookies,
//  and ensure CORS policies are properly configured.
// Token management: Avoid exposing tokens in query strings or headers; use HTTP-only cookies for storage.
// HTTPS: Ensure all communication is encrypted with HTTPS.
// Rate limiting and authentication: Add rate-limiting mechanisms and validate user sessions for each request.