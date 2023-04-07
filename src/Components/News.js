import React, { useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props)=>{

	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0)
	// document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}


	const  updateNews = async()=> {
		props.setProgress(10)
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=87736ce4872348aea8c9cea024b12255&page=${page}&pageSize=${props.pageSize}` 
		setLoading(true)
		let data = await fetch(url)
		props.setProgress(30)
		let parsedData = await data.json()
		props.setProgress(60)
		setArticles(parsedData.articles)
		setTotalResults(parsedData.totalResults)
		setLoading(false)
		props.setProgress(100)
	}
	useEffect(() => {
		updateNews()
		// eslint-disable-next-line 
	}, [])
	 
	// const handlePrevClick = async () => {
	// 	setPage(page-1)
	// 	updateNews()
	// }
	// const handleNextClick = async () => {
	// 	setPage(page+1)
	// 	updateNews()
	// }

	const fetchMoreData = async () => {
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=87736ce4872348aea8c9cea024b12255&page=${page+1}&pageSize=${props.pageSize}`
		setPage(page+1)
		let data = await fetch(url)
		let parsedData = await data.json() 
		setArticles(articles.concat(parsedData.articles))
		setTotalResults(parsedData.totalResults)
	
	}

 

		return (

			<div>
				<div className="container my-3">
					<h1 className="text-center" style={{ margin: '30px 0px', marginTop:'90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
					{loading}

					<InfiniteScroll
						dataLength={articles.length}
						next={fetchMoreData}
						hasMore={articles.length !== totalResults}
						loader={<h4>Loading...</h4>}
					>
						<div className="container">


							<div className="row">
								{articles.map((element) => {
									return <div className="col-md-4" key={element.url}>
										<NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
									</div>
								})}
							</div>
						</div>
					</InfiniteScroll>
					{/* <div className="container d-flex justify-content-between">
						<button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
						<button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next  &rarr;</button>
					</div> */}
				</div>

			</div >
		)
	
}

News.propsTypes = {
	country: 'in',
	pageSize:8,
	category: 'general',
}
News.propsTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string,
}

export default News