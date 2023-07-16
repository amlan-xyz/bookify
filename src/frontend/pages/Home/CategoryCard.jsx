import './HomeStyle.css'

export function Card({item}){
	const {categoryName,description}=item;
	return <div className="category_card">
		<img className="card_img" src='' alt="" />
      <div className="card_body">
        <h4 className="card_heading">{categoryName}</h4>
		<hr />
        <p className="">{description}</p>
      </div>
	</div>
}