<template>
  <header class="text-gray-700 body-font border-b border-gray-200">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <router-link to="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="" target="_blank">
        <span class="ml-3 text-xl">{{ $t('appname') }}</span>
      </router-link>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a class="mr-5 hover:text-gray-900 cursor-pointer" @click="changeLanguage">{{ $i18n.locale == 'en' ? 'ქართული' : 'English'}}</a>
      </nav>
      <button class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0" @click="logout">Logout
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  <section class="text-gray-700 body-font border-t border-gray-200">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">{{ $t('statistics.name') }}</h2>
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">{{ $t('statistics.description') }}</h1>
      </div>

      <div class="flex flex-wrap">
        <div class="container mx-auto px-4 sm:px-8">


          <div class="flex md:flex-no-wrap flex-wrap justify-center md:justify-start">
            <input class="sm:w-64 w-40 bg-gray-100 rounded sm:mr-4 mr-2 border border-gray-400 focus:outline-none focus:border-indigo-500 text-base py-2 px-4" :placeholder="$t('search.placeholder')" type="text" v-model="filter.string">
            <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" @click="page = 1; search('getData')">{{ $t('search.button') }}</button>
            <p class="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center" v-html="$t('search.description')">
            </p>
          </div>


          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {{ $t('country') }}
                    <arrow :position="filter.sort == 'country' && filter.order == 'asc' ? 'down' : 'up'" :active="filter.sort == 'country'" @click="setFilter('country')"></arrow>
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {{ $t('confirmed') }}
                    <arrow :position="filter.sort == 'confirmed' && filter.order == 'asc' ? 'down' : 'up'" :active="filter.sort == 'confirmed'" @click="setFilter('confirmed')"></arrow>
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {{ $t('recovered') }}
                    <arrow :position="filter.sort == 'recovered' && filter.order == 'asc' ? 'down' : 'up'" :active="filter.sort == 'recovered'" @click="setFilter('recovered')"></arrow>
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    {{ $t('deaths') }}
                    <arrow :position="filter.sort == 'death' && filter.order == 'asc' ? 'down' : 'up'" :active="filter.sort == 'death'" @click="setFilter('death')"></arrow>
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="resource in resources.array" :key="resource.id">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ resource.name_local }}
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ resource.confirmed ?? 0 }}</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ resource.recovered ?? 0 }}</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ resource.death ?? 0  }}</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button type="button" class="inline-block text-gray-500 hover:text-gray-700">
                      <svg class="inline-block h-6 w-6 fill-current" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"/></svg>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="flex justify-center" v-if="page < resources.lastPage" @click="loadMore">
            <div class="cursor-pointer animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import arrow from './parts/Arrow';

export default {
  name: 'HomeComponent',
  components: {
    arrow
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    resources() {
      return this.$store.state.resources;
    },
    resource() {
      return this.$store.state.resource;
    }
  },
  data() {
    return {
      page: 1,
      filter: {
        string: '',
        order: 'asc',
        sort: 'country'
      }
    };
  },
  created() {
    // Get the countries data with statistics
    this.search('getData');
  },
  methods: {
    setFilter(field)
    {
      this.filter.order = this.filter.sort == field ? (this.filter.order == 'asc' ? 'desc' : 'asc') : 'asc';
      this.filter.sort = field;

      this.page = 1;
      this.search('getData');
    },
    search(method = 'loadMore') {
      let filter = this.filter;
      let string = filter.string && filter.string.length > 1 ? ('string=' + filter.string + '&') : '';
      string = string + 'order=' + filter.order + '&sort=' + filter.sort;
      this.$store.dispatch(('resources/' + method), {page: this.page, searchString: string})
    },
    loadMore()
    {
      this.page++;
      if(this.page > this.resources.lastPage) return false
      this.search();
    },
    changeLanguage()
    {
      this.$i18n.locale = this.$i18n.locale == 'en' ? 'ka' : 'en';

      // Reload the countries data with statistics for the current language
      this.page = 1;
      this.search('getData');
    },
    logout() {
      this.$store.dispatch('user/logout');
    },
  }
};
</script>

<style scoped>
.svg-arrow-table {
  height: 25px;
  display: inline-flex;
  width: 25px;
  margin-top: -3px;
}
</style>
