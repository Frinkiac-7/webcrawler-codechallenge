'use strict'

let success = []
let skipped = []
let errors = []

// Function to extract host address URLs from the inetOne and inetTwo objects
const getURLs = function (data) {

  let urls = []
  const objLength = Object.entries(data.pages)

  // Cycle through the array to get only the valid URLs in the object
  for (let i = 0; i < objLength.length; i++) {
    urls.push(data.pages[i].address)
  }
  return urls
}

const crawler = function (data) {

  // Use the host address URLs as a roadmap for which page links are valid and can be crawled
  const validURLs = getURLs(data)

  // Iterate through the object to access the list of links to be crawled for each address
  for (let i = 0; i < validURLs.length; i++) {

    // Shorthand variable for the link iteration.  This is primarily for readability as links.forEach is a easier to comprehend than data.pages[i].links
    const links = data.pages[i].links

    // Check to see if the link does not exist in the success, skipped, or error arrays and assign or ignore as appropriate
    links.forEach(function(element) {
      // Add the address URL to the success array only if the host address URL AND the link element do not already exist in the array.  This precludes adding a host address (specifically http://foo.bar.com/p6 in the sample data) to the success array when the link element (http://foo.bar.com/p1) has already been scanned.
      if (!success.includes(validURLs[i]) && !success.includes(element)) {
        success.push(validURLs[i])
      }
      if (!validURLs.includes(element)) {
        // Add links that are not valid URLs to the errors array
        errors.push(element)
      } else if (!success.includes(element)) {
        // Add the element to the success array if it isn't already there
        success.push(element)
      } else if (!skipped.includes(element)) {
        // Add the element to the skipped array ONLY if it isn't already there
        skipped.push(element)
      }
    })
  }

  console.log('Success:', success)
  console.log('Skipped:', skipped)
  console.log('Errors:', errors)

  // reset tracking arrays for next invocation of the function
  success = []
  skipped = []
  errors = []
}

// Object containing first set of links (taken directly from prompt)
const inetOne = {
  "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": []
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
    }
  ]
}

// Object containing second set of links (taken directly from prompt)
const inetTwo = {
  "pages": [
      {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p1"]
    }
  ]
}

crawler(inetOne)
crawler(inetTwo)
