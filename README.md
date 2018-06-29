# GE Digital Code Challenge
The assignment is to crawl two objects containing host address URLs and link URLs to scan each item and catalog them in success, skipped, or error arrays.

## The specific prompt was as follows:

For the purposes of this project, we define the Internet as the test data in this document, and a web crawler as software that requests pages from the Internet, parses the content to extract all the links in the page, and visits the links to crawl those pages, to an infinite depth.

## Assumptions

1) Any link URLs that were not designated in the object as a host URL were considered invalid and assigned to the errors array.
2) The exact order of the expected output as provided in the prompt was significant but not the style.  Therefore, only the order in which they were presented in the output needed to be replicated exactly as listed.
3) The objects provided (referred to as Internet 1 and Internet 2 in the challenge) were to be considered exact and immutable for the assignment.

## Solution Approach
The first step was to isolate the valid host address URLs.  The reason for this is that it provided a quick and efficient way of establishing the contents of the errors array.

Using the return value of the valid host address URLs function, the next task was to iterate through the array of links associated with each valid URL and classify them as appropriate.

## Results
The code challenge was completed successfully per the conditions listed in the challenge and within the assumptions listed above.  
