import { Flex, Heading, Img, Box, SimpleGrid, IconButton, Text, Input, Button } from "@chakra-ui/react";
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
    const [newComment, setNewComment] = useState({});

    // ratings state
    const [ratings, setRatings] = useState({});


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

    // update comment for gif id
    const updateComment = (gifId, value) => {
        setNewComment((prevComment) => ({
            ...prevComment,
            [gifId]: value
        }));

    }



    return (
        <Flex direction={'column'}>
            <Flex justifyContent={'center'}>
                <Heading>{user.username}'s Fav Gifs</Heading>
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
                                    {favs.comments ? (
                                        <>
                                            <Text>{favs.comments}</Text>
                                            <Button>Edit</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Input placeholder="leave a comment" value={newComment[gif.id]} onChange={(e) => { updateComment(gif.id, e.target.value) }} />
                                            <Button>Save</Button>
                                        </>
                                    )}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>
        </Flex>
    )
}