import React from "react";
import Lottie from "react-lottie";

import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import Contacts from "./components/Contacts";
import LoadMore from "./components/LoadMore";

import api from "./services/api";

import loadingData from "./assets/lottie/loading.json";

import "./App.scss";

const animationOptions = {
  loop: true,
  autoPlay: true,
  animationData: loadingData,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      contactsFiltered: [],
      isFiltered: false,
      limit: 20,
      page: 1,
      hasMore: true,
      sortBy: "name",
      isLoading: false,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleChandeSortBy = this.handleChandeSortBy.bind(this);
    this.handleLoadContacts = this.handleLoadContacts.bind(this);
  }

  async componentDidMount() {
    await this.handleLoadContacts();
  }

  async handleLoadContacts() {
    const { contacts, page, limit, sortBy } = this.state;

    this.setState({ isLoading: true });

    const response = await api.get(
      `/contacts?page=${page}&limit=${limit}&sortBy=${sortBy}`
    );

    const contactsOldLength = contacts.length;
    const hasMore = response.data.length === limit;

    this.setState({
      contacts: response.data,
      contactsOldLength,
      hasMore,
      isLoading: false,
    });
  }

  handleLoadMore() {
    this.setState(
      (state) => ({
        limit: state.limit + 20,
      }),
      this.handleLoadContacts
    );
  }

  handleChandeSortBy(sortBy = "name") {
    this.setState({ sortBy }, this.handleLoadContacts);
  }

  handleFilter(filterTerm) {
    const { contacts, contactsFiltered } = this.state;
    const newContactsFiltered = contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(filterTerm)
    );

    const isEmpty = !!!newContactsFiltered.length;
    const isFiltered = !!filterTerm;

    this.setState({
      contactsFiltered: isEmpty ? contactsFiltered : newContactsFiltered,
      isFiltered,
    });
  }

  render() {
    const {
      contacts,
      contactsFiltered,
      isFiltered,
      hasMore,
      isLoading,
    } = this.state;

    return (
      <>
        <Topbar />
        <Filters sortBy={this.handleChandeSortBy} filter={this.handleFilter} />

        {isLoading ? (
          <Lottie height={100} width={100} options={animationOptions} />
        ) : (
          <Contacts contacts={isFiltered ? contactsFiltered : contacts} />
        )}

        {hasMore && (
          <LoadMore
            handleLoadMore={this.handleLoadMore}
            isLoading={isLoading}
          />
        )}
      </>
    );
  }
}

export default App;
