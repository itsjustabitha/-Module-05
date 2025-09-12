const express = require("express");
const router = express.Router();
const friends = require('../models/friends')


// TODO - #1: Add support to the 'filter' endpoint for a new query parameter 'letter' which filters friends by starting letter

// TODO - #2: Modify the 'info' route to only return the user-agent --- content-type --- accept header data

// TODO - #3: Modify the dynamic GET route to return a single friend object matching the dynamic 'id' request parameter

// TODO - #4: Complete the PUT route which will update data for an existing friend


// default endpoint, gets all friends
router.get('/', (req, res) => {
    res.json(friends)
})

// filter endpoint, gets friends matching the gender from 'gender' query parameter ie. /friends/filter?gender=male
// 1. Add support to also filter by a starting 'letter' query parameter ie. /friends/filter?letter=R

// http://localhost:3000/friends/filter?gender=male
//[{"id":2,"name":"Joey","gender":"male"},{"id":3,"name":"Chandler","gender":"male"},{"id":5,"name":"Ross","gender":"male"}]

// http://localhost:3000/friends/filter?gender=female
// [{"id":1,"name":"Phoebe","gender":"female"},{"id":4,"name":"Monica","gender":"female"},{"id":6,"name":"Rachael","gender":"female"}]

// http://localhost:3000/friends/filter?letter=R
// [{"id":5,"name":"Ross","gender":"male"},{"id":6,"name":"Rachael","gender":"female"}]

router.get('/filter', (req, res) => {
    console.log(req.query)
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter
    console.log(filterLetter)
    let matchingFriends = [...friends];

    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => friend.gender === filterGender);
    }
    
    if (filterLetter) {
        matchingFriends = matchingFriends.filter(friend => friend.name.startsWith(filterLetter))
        console.log('filteLetter', matchingFriends)
    }

    if (matchingFriends.length > 0) {
        // return valid data when the gender matches 
        res.status(200).json(matchingFriends)
    } else {
        // and an error response when there are no matches
        res.status(404).json({error: "No friends matching gender "+filterGender})
    }  
})

// 2. Get information about this request from the headers
router.get('/info', (req, res) => {
    console.log(req.headers["user-agent"]) // want to use bracket notation so that we can use a string!
    console.log(req.headers["content-type"]) // undefined - so it was ignored! 
    console.log(req.headers.accept) //doesn't have special character so no need for brackets.
    
    // Needs to be packaged in an object OR an array.
    const headers ={
        "user-agent": req.headers["user-agent"],
        "user-agent": req.headers["content-type"],
        accept: req.headers.accept
    }

    // Modify this response to just return info on the user-agent, content-type and accept headers
    // res.json(req.headers)  
    // res.json(req.headers["user-agent"])  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
    // res.json([req.headers["user-agent"],req.headers["content-type"], req.haders["accept"]]) // wrapped as an array
    // console.log(req.headers["content-type"]) 
    res.json(req.headers)  
    // Output: {"host":"localhost:3000","connection":"keep-alive","cache-control":"max-age=0","sec-ch-ua":"\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"","sec-ch-ua-mobile":"?0","sec-ch-ua-platform":"\"macOS\"","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br, zstd","accept-language":"en-US,en;q=0.9"}



})

// 3. Dynamic request param endpoint - get the friend matching the specific ID ie. /friends/3
router.get('/:id', (req, res) => {
    console.log(req.params)
    let friendId = req.params.id; // 'id' here will be a value matching anything after the / in the request path

    // Modify this function to find and return the friend matching the given ID, or a 404 if not found

    // Modify this response with the matched friend, or a 404 if not found
    res.json({result: 'Finding friend with ID ' + friendId})
})

// a POST request with data sent in the body of the request, representing a new friend to add to our list
router.post('/', (req, res) => {
    let newFriend = req.body; // FIRST add this line to index.js: app.use(express.json());
    console.log(newFriend) // 'body' will now be an object containing data sent via the request body

    // we can add some validation here to make sure the new friend object matches the right pattern
    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({error: 'Friend object must contain a name and gender'});
        return;
    }
    else if (!newFriend.id) {
        newFriend.id = friends.length + 1; // generate an ID if one is not present
    }

    // if the new friend is valid, add them to the list and return the successfully added object
    friends.push(newFriend)
    res.status(200).json(newFriend)
})

// 4. Complete this new route for a PUT request which will update data for an existing friend
router.put('/:id', (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;

    // Replace the old friend data for friendId with the new data from updatedFriend

    // Modify this response with the updated friend, or a 404 if not found
    res.json({result: 'Updated friend with ID ' + friendId, data: updatedFriend})
})

module.exports = router;