import React from "react";

class LoadMore extends React.Component {
  render() {
    const { handleLoadMore, isLoading } = this.props;

    return (
      <div className="load-more">
        <div className="container">
          <button onClick={() => handleLoadMore()} className="loader__botton">
            Carregar mais contatos{" "}
            <i
              className={`fas ${
                isLoading ? "fa-circle-notch load" : "fa-sort-down"
              }`}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default LoadMore;
