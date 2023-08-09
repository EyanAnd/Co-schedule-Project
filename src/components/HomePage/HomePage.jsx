import { Flex, Heading, Input, Button, Img, SimpleGrid, Text, IconButton, Box, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// imports for react icons
import { FaStar } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa";

export default function HomePage() {

    // bring in current user from the store 
    const user = useSelector((store) => store.user);

    // bring in the search reducer
    const searchResults = useSelector((store) => store.search)

    // init dispatch
    const dispatch = useDispatch();

    // set state for giphy search
    const [search, setSearch] = useState('');
    // set state for comments
    const [comments, setComments] = useState('');

    // ratings state
    const [ratings, setRatings] = useState({});
    //  rating function
    const rateGif = (gifId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [gifId]: rating,
        }));
    };

    const addComment = (gifId, comment) => {
        setComments((prevComments) => ({
            ...prevComments, 
            [gifId]: comment
        }))
    }

    // post to favs here
    const addGifToFavs = () => {
        console.log('addinga a gif here')
    }

    // bring in use effect
    return (
        <Flex gap={4} padding={2} direction={'column'} justifyContent={'center'}>
            <Flex>
                <Heading>Welcome, {user.username}!</Heading>
            </Flex>
            <Flex direction={'row'} w={'25%'} gap={2} padding={1} justifyContent={'center'}>
                <Input value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button onClick={() => dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: search })}>Search</Button>
            </Flex>
            {/* is a user searching? if so, show this */}
            {user.id ?
                <>
                    <SimpleGrid columns={3} spacing={4}>
                        {searchResults.map(gif => (
                            <Box key={gif.id} p={4} borderWidth="1px" borderColor="gray.300" borderRadius="md">
                                    <Flex flexDirection={'column'} position={'relative'}>
                                        <Flex gap={4} flexDirection={'column'}>
                                            <Img on key={gif.id} src={gif.images.original.url} />
                                            <Flex alignItems={'center'} mt={2}>
                                                <Text>Rate: </Text>
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <IconButton key={rating} icon={<FaStar />}
                                                        size={'sm'}
                                                        color={ratings[gif.id] >= rating ? 'yellow.500' : 'gray.200'}
                                                        aria-label={`Rate ${rating}`}
                                                        onClick={() => rateGif(gif.id, rating)} />
                                                ))}
                                            </Flex>
                                            <Input placeholder="leave a comment" value={comments[gif.id] || ''} onChange={(e) => addComment(gif.id, e.target.value)} />
                                <Flex direction={'column'} align={'right'}>
                                    <IconButton icon={<FaCheck />} size={'sm'} onClick={addGifToFavs} />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </SimpleGrid>
                </>
                :
                <></>}
        </Flex>
    )
}