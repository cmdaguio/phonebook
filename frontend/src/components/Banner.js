const Banner = ({ message, bannerType }) => {
    if (message === null && bannerType === null) {
        return null;
    }
    return (
        <div className={bannerType} >
            {message}
        </div>
    );
};

export default Banner;