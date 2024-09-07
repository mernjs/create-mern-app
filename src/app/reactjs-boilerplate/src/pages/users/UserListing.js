import React, { useState } from 'react';
import { Header, Footer } from 'components';
import { useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from 'services/UserServices';
import ReactPaginate from 'react-paginate';

const UserListing = () => {
	const [page, setPage] = useState(0);
	const navigate = useNavigate();
	const { data, isFetching } = useGetUsersQuery(page + 1);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className='mb-auto'>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Users</h2>
					{isFetching ? <div style={{ margin: '0 auto', width: '500px' }}><p>Loading...</p></div> :
						<>
							{data?.data?.docs?.map((item, index) => {
								return <div key={index} onClick={() => navigate(`/users/${item._id}`)} style={{ padding: '10px', border: '2px solid gray', width: '500px', margin: '0 auto', marginBottom: '20px' }}>
									<p><b>Name:</b> {item.name}</p>
									<p><b>Email:</b> {item.email}</p>
								</div>;
							})}
							<div style={{ margin: '0 auto', width: '500px' }}>
								<ReactPaginate
									initialPage={page}
									onPageChange={(page) => setPage(page.selected)}
									pageRangeDisplayed={5}
									pageCount={data?.data?.totalPages}
									activeClassName="active"
								/>
							</div>
						</>
					}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default UserListing;
