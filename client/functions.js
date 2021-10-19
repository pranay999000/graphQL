const count = document.getElementById("count");
const plus = document.getElementById("plus");

const getCount = {
	query: "query{ getCount{ id, count } }",
}

const plusOne = {
	query: 'mutation{ plusOne(countId: "616f0c80abc6845dd3834522") { count } }',
}

axios.post("http://localhost:8000", getCount)
	.then(res => {
		count.innerHTML = res.data.data.getCount[0].count;
	})
	.catch(error => {
		console.log(error)
	})

plus.addEventListener("click", (e) => {
  	axios.post("http://localhost:8000", plusOne).then((res) => {
    	count.innerHTML = res.data.data.plusOne.count;
  	});
});