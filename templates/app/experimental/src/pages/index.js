import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import apiRequest from '../Utilities';

const Home = () => {
	const user = useSelector((state) => state.auth.user);
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(false)
	const serialize = (obj) => {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	}
	const queryParams = new URLSearchParams(window.location.search)
	const payload = {
		keyword: queryParams.get("keyword") || '',
		location: queryParams.get("location") || '',
		dateSincePosted: queryParams.get("dateSincePosted") || '',
		jobType: queryParams.get("jobType") || '',
		remoteFilter: queryParams.get("remoteFilter") || '',
		salary: queryParams.get("salary") || '',
		experienceLevel: queryParams.get("experienceLevel") || '',
		sortBy: queryParams.get("sortBy") || '',
		limit: queryParams.get("limit") || '',
	};
	const getLinkedInJobs = async () => {
		try {
			setLoading(true)
			const response = await apiRequest.get(`linkedin/jobs?${serialize(payload)}`);
			setJobs(response.data.data)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error);
		}
	};

	useEffect(() => {
		getLinkedInJobs()
	}, [])

	return (
		<>
			<ScrollView>
				<Header />
				<Container>
					{loading && <p>Loading...</p>}
					{jobs.map((item, index) => {
						return <Card key={index}>
							<a href={item.jobUrl} target='_blank'>
								<h1>{item.position}</h1>
								<p>{item.company}</p>
								<p>{item.location}</p>
								<p>{item.date}</p>
								{item.salary && <p>{item.salary}</p>}
							</a>
						</Card>
					})}
				</Container>
			</ScrollView>
			<Footer />
		</>
	);
};

export default Home;

const ScrollView = styled.div`
    min-height: calc(100vh - 80px);
`;

const Container = styled.div`
    margin-top: 50px;
	margin-left: 33%;
`;

const Card = styled.div`
	width: 500px;
	padding: 20px;
    margin-top: 20px;
	border: 10px solid lightgray;
	a{
		h1{
			font-size: 20px;
			font-weight: bold;
		}
	}
`;