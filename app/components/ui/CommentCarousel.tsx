import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CommentCarousel = ({ comments }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
    };

    return (
        <Slider {...settings}>
            {comments.map((comment, index) => (
                <div key={index}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-800 whitespace-normal">"{comment.text}"</p>
                        <p className="text-black font-semibold mt-5">- {comment.author}</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default CommentCarousel;
