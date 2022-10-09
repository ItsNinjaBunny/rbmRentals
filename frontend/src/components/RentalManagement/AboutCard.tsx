import { props } from "./About.props";


export const AboutCard = (props: props) => {

	return (
		<div className='border py-8 rounded-xl shadow-md hover:shadow-2xl duration-200'>
			<p className='text-6xl font-bold text-indigo-600'>{props.title}</p>
			<p className='text-gray-400 mt-2'>{props.desc}</p>
		</div>
	);
}