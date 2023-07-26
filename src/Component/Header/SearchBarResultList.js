import SearchBarResult from './SearchBarResult'

function SearchBarResultList({ result,hideList }) {

    return (
        <>
            <div className='searchBar-display' style={hideList}>
                <div className='searchbar-result' style={hideList}>
                    {
                        result.map((result, id) => {
                            return <SearchBarResult result={result} key={id} hideList={hideList} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SearchBarResultList