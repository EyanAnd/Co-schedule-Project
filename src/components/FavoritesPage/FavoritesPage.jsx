import { Flex, Heading, Img, Box, SimpleGrid, IconButton, Text, Input, Button, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from 'react-icons/fa'



export default function FavoritesPage() {
    // init dispatch
    const dispatch = useDispatch();
    // bring in user
    const user = useSelector((store) => store.user)
    // grab the favorites from the store
    const favs = useSelector((store) => store.favorites)

    // use effect to fetch favorites on load of the page
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

    // function to update the comment for a gif
    const updateComment = (gif) => {
        let comment; // create comments variable to send in dispatch
        // create logic for comment new comment
        newComment ? comment = newComment : comment = gif.comments;
        // dispatch
        dispatch({
            type: 'UPDATE_COMMENT_ON_FAV',
            payload: {
                id: gif.id,
                comments: comment
            }
        })
        // clear new comment
        setNewComment('');
        // turn edit mode off
        setEditMode(false);
    };



    return (
        <Flex direction={'column'}>
            <Flex direction={'row'} justifyContent={'center'}>
                <Heading color={'brand.text'} >{user.username}'s Fav Gifs</Heading>
            </Flex>
            <Flex p={2} flexDirection={'column'}>
                <Heading paddingBottom={'4'} size={'md'} color={'brand.text'}>Filter by rating below</Heading>
                {/* create tabs with dispatches for the user to filter throught their results */}
                <Tabs color={'brand.text'} >
                    <TabList color={'brand.orange'} >
                        <Tab onClick={() => dispatch({ type: 'FETCH_USER_FAV' })} >All</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 0 })}>Not Yet Rated</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 1 })}>1 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 2 })}>2 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 3 })}>3 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 4 })}>4 Star</Tab>
                        <Tab onClick={() => dispatch({ type: 'FILTER_GIFS', payload: 5 })}>5 Star</Tab>
                    </TabList>
                </Tabs>
            </Flex>
            {/* implement grid layout for mapping over the favorites of the user */}
            <SimpleGrid columns={3} spacing={4}>
                {favs.map(gif => (
                    <Box key={gif.id} p={4} borderWidth="1px" borderColor="brand.accent" borderRadius="md">
                        <Flex flexDirection={'column'} position={'relative'}>
                            <Flex gap={4} flexDirection={'column'}>
                                <Img key={gif.id} src={gif.url} />
                                <Flex>
                                    {/* map over an array of 5 and with each of them make an icon button */}
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <IconButton
                                            key={index}
                                            icon={<FaStar />}
                                            // if the gif rating is greater than the index show that many colored in icon buttons
                                            color={index < gif.rating ? "brand.orange" : "brand.text"}
                                            // click on an index in order to rate the gif with that given index value + 1
                                            onClick={() => rateGif(gif.id, index + 1)}
                                        />
                                    ))}
                                </Flex>
                                <Flex direction={'row'} justifyContent={'space-between'}>
                                    {/* if edit mode is on and the selected gif id equals the gif id, show the edit options */}
                                    {editMode && selectedGif === gif.id ? (
                                        <Flex gap={2}>
                                            {/* set newComment value to what they typed in */}
                                            <Input color={'brand.text'} placeholder={gif.comments} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                                            {/* on click run the update comment passing in the gif */}
                                            <Button bgColor={'brand.text'} color={'white'} onClick={() => updateComment(gif)}>Save</Button>
                                        </Flex>
                                    )
                                        :
                                        // if not, show the current comment adn edit button
                                        <Flex direction={'column'} justifyContent={'space-between'} gap={4}>
                                            <Text color={'brand.text'}>{gif.comments ? gif.comments : 'Click edit to add a comment'}</Text>
                                            <Flex flexDir={'row'} gap={2}>
                                                {/* sets the selected id to the gif id for the particular gif */}
                                                <Button color={'white'} bgColor={'brand.orange'} onClick={() => { setEditMode(true); setSelectedGif(gif.id) }}>Edit</Button>
                                                {/* delete button dispatch */}
                                                <Button bgColor={'red.500'} color={'white'} onClick={() => dispatch({ type: 'DELETE_FROM_FAV', payload: { id: gif.id } })}>Delete</Button>
                                            </Flex>
                                        </Flex>
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