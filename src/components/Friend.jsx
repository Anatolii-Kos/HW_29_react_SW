const Friend = ({picture, pos}) => {
    let styles = "p-0.5 w-full ";
    if (pos === 7) {
        styles += ' rounded-bl-2xl'
    }
    if (pos === 9) {
        styles += ' rounded-br-2xl'
    }
    return (
        <img className={styles} src={picture} alt="Friend"/>
    );
};

export default Friend;
