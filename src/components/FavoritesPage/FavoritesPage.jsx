import { Flex, Heading, Img, Box, SimpleGrid, IconButton, Text, Input, Button, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from 'react-icons/fa'



export default function FavoritesPage() {

    // bring in user
    const user = useSelector((store) => store.user)


    const dispatch = useDispatch();
    const favs = useSelector((store) => store.favorites)
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_FAV' });
    }, [dispatch])

    // set state for comments
    const [newComment, setNewComment] = useState('');

    // ratings state
    const [ratings, setRatings] = useState({});

    // set edit mode for comments
    const [editMode, setEditMode] = useState(false);
    // set state for selected gif
    const [selectedGif, setSelectedGif] = useState(null);

    // function for rating a gif
    const rateGif = (gifId, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [gifId]: rating,
        }));

        // dispatch to update rating
        dispatch({
            type: 'UPDATE_RATING_ON_FAV',
            payload: {
                id: gifId,
                rating: rating
            }
        })
    };

    const updateComment = (gif) => {
        let comment; // create comments variable to send in dispatch


        // create logic for comment new comment
        newComment ? comment = newComment : comment = gif.comments;

        dispatch({
            type: 'UPDATE_COMMENT_ON_FAV',
            payload: {
                id: gif.id,
                comments: comment
            }
        })
        setNewComment('');
        setEditMode(false);

    }



    return (
        <Flex direction={'column'}>
            <Flex justifyContent={'center'}>
                <Heading>{user.username}'s Fav Gifs</Heading>
            </Flex>
            <Flex flexDirection={'column'}>
                <Heading>Filter By</Heading>
                <Tabs>
                    <TabList>
                        <Tab onClick={() => dispatch({ type: 'FETCH_USER_FAV'})} >All</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 0 })}>Not Yet Rated</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 1 })}>1 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 2 })}>2 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 3 })}>3 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 4 })}>4 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 5 })}>5 Star</Tab>
                    </TabList>
                </Tabs>
            </Flex>
            <SimpleGrid columns={3} spacing={4}>
                {favs.map(gif => (
                    <Box key={gif.id} p={4} borderWidth="1px" borderColor="gray.300" borderRadius="md">
                        <Flex flexDirection={'column'} position={'relative'}>
                            <Flex gap={4} flexDirection={'column'}>
                                <Img key={gif.id} src={gif.url} />
                                <Flex>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <IconButton
                                            key={index}
                                            icon={<FaStar />}
                                            color={index < gif.rating ? "gold" : "gray"}
                                            onClick={() => rateGif(gif.id, index + 1)}
                                        />
                                    ))}
                                </Flex>
                                <Flex>
                                    {editMode && selectedGif === gif.id ? (
                                        <>
                                            <Input placeholder={gif.comments} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                                            <Button onClick={() => updateComment(gif)}>Save</Button>
                                        </>
                                    )
                                        :
                                        <>
                                            <Text>{gif.comments ? gif.comments : 'Click edit to add a comment'}</Text>
                                            <Button onClick={() => { setEditMode(true); setSelectedGif(gif.id) }}>Edit</Button>
                                            <Button onClick={() => dispatch({ type: 'DELETE_FROM_FAV', payload: { id: gif.id }})}>Delete</Button>
                                        </>
                                    }
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    )
}