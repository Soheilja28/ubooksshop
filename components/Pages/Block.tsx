export const Block = props => {
    if (!props.state.fav) {
        props.state.fav = []
    }
  
    if (!props.state.cart) {
        props.state.cart = []
    }
    
    return <f-x style={{
        width: 150,
        height: 290,
        flex: 1,
        objectFit: "fill",
        position: "relative",
    }}>


        <c-x class={global.styles.hoverzoom_nofade} style={{
            width: 150,
            height: 260,
            backgroundColor: "white",
            boxShadow: "0 0 9px black",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginTop:5
        }}>

            <img
                src={props.book.imageLink} style={{
                    width: 150,
                    height: 200,
                    flex: 1,
                    objectFit: "fill",
                    minWidth: 150,
                    gap: 10,

                }}
                onClick={() => {
                    props.state.form = "bookspecs"
                    props.state.book = props.book
                    props.refresh()

                }} />

            <br-xx />
            <br-xxx />
            <br-xxx />
            <br-xxx />

            <w-cc style={{ fontSize: 11, color: "darkblue", direction: "ltr" }}>{props.book.title}</w-cc>

            <br-xx />
            <br-xx />
            <br-xx />

            <f-cc><hr style={{ width: 120 }} /></f-cc>

            <br-xx />

            <w-cc><del>{(props.book.price * 1.2 as number).toLocaleString("fa-IR")}</del></w-cc>
            <w-cc>{(props.book.price as number).toLocaleString("fa-IR")} تومان</w-cc>

            <br-x />
            <br-x />
            <br-x />

            {props.state.fav.includes(props.book.title) ? <img src="https://irmapserver.ir/research/12/heart.png"
                style={{ width: 30, height: 30, position: "absolute", marginTop: 225, marginRight: 8 }} /> : null}

            {props.state.cart.includes(props.book.title) ? <img src="https://irmapserver.ir/research/12/check%20%282%29.png"
                style={{ height: 30, width: 30, position:"absolute", marginRight:110, marginTop:225 }} /> : null}

        </c-x>



    </f-x>

}