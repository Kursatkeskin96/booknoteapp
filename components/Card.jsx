const Card = ({ book }) => {
    console.log(book);
    return (
      <>
        {book.map((item, index) => {
          let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
          if (thumbnail !== undefined) {
            return (    
        <div className="mt-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index} onClick={() => { setShow(true); setItem(item) }}>
        <img className="rounded-t-lg items-center mx-auto mt-3" src={thumbnail} alt="" />
        <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.volumeInfo.title}</h5>
        <p className="mb-3 font-normal italic text-gray-700 dark:text-gray-400">{item.volumeInfo.authors}</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to Library
        </a>
    </div>
</div>
            );
          }
          return null; // Don't forget to handle the case when thumbnail or amount is undefined
        })}
      </>
    );
  };
  
  export default Card;
  