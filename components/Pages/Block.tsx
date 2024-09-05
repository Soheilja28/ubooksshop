export const Block = props => {
    if (!props.state.fav) {
        props.state.fav = []
    }

    if (!props.state.cart) {
        props.state.cart = []
    }

    return <c-c class={global.styles.hoverzoom_nofade}
        onClick={() => {
            props.state.form = "bookspecs"
            props.state.book = props.book
            props.refresh()

        }}
        style={{
            width: 160,
            height: 270,
            minWidth: 160,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            position: "relative",
            backgroundColor: "white",
            boxShadow: "0 0 9px black",
            marginTop: 20

        }}>

        <img
            src={props.book.imageLink} style={{
                width: 150,
                height: 190,
                minWidth: 150,
                marginTop: 5,
                objectFit: "fill"
            }}
        />



        <br-xx />
        <br-xx />
        <br-xxx />
        <br-xxx />

        <w-cc style={{ fontSize: 11, color: "darkblue", direction: "ltr" }}>{props.book.title}</w-cc>

        <br-xx />
        <br-xx />
        <br-xx />

        <f-cc><hr style={{ width: 120, opacity: 0.7 }} /></f-cc>

        <br-xx />

        <w-cc style={{ color: "red" }}><del>{(props.book.price * 1.2 as number).toLocaleString("fa-IR")}</del></w-cc>
        <w-cc>{(props.book.price as number).toLocaleString("fa-IR")} تومان</w-cc>

        <br-x />
        <br-x />
        <br-x />


        {props.state.fav.includes(props.book.title) ? <img src="https://cdn.ituring.ir/research/12/heart%20main.png"
            style={{
                width: 28,
                height: 28,
                position: "absolute",
                top: 230,
                right: 8
            }} /> : null
        }


        {props.state.cart.includes(props.book.title) ? <img src="https://cdn.ituring.ir/research/12/check%20%282%29.png"
            style={{
                height: 30,
                width: 30,
                position: "absolute",
                top: 230,
                right: 120
            }} /> :
            <img src='https://cdn.ituring.ir/research/12/add-to-cart.png' style={{
                height: 30,
                width: 30,
                position: "absolute",
                top: 230,
                right: 120
            }} />
        }

    </c-c>





}