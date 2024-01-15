export function Banner(props) {
    const {title} = props;
    return(<div className={'w-100 p-2 bg-green text-white'}>
        <h4 className={'d-block text-center p-3'}>{title.toUpperCase()}</h4>
    </div>);
}
