import { props } from "./AllInOne.props";
import { CheckIcon } from "@heroicons/react/24/solid";

export const AllInOneCard = (props: props) => {

		return (
				<div className='flex'>
						<div>
								<CheckIcon className='w-7 mr-4 text-green-600' />
						</div>
						<div>
								<h3 className='font-bold text-lg'>{props.title}</h3>
								<p className='text-lg pt-2 pb-4'>{props.desc}</p>
						</div>
				</div>
		)
}