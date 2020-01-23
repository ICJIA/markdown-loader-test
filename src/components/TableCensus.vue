<template>
  <div>
    <v-card v-if="displaySimpleTable">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">State</th>
              <th class="text-left">County</th>
              <th class="text-left">Census Tract Name</th>
              <th class="text-left">GeoID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.state_name }}</td>
              <td>{{ item.county_name }}</td>
              <td>{{ item.census_tract_name }}</td>
              <td>{{ item.census_tract_geoid }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          id="my-input"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        v-if="!loading"
        id="test"
        style="width: 100%"
      ></v-data-table>
    </v-card>
    <div class="text-center mt-5" style="font-size: 12px;">
      Download:
      <a href="EligibleAreasCensusTracts.pdf" class="heavy">PDF</a
      >&nbsp;|&nbsp;<a
        class="heavy"
        href="api/data/EligibleAreasCensusTracts.json"
        >JSON</a
      >&nbsp;|&nbsp;<a
        class="heavy"
        href="api/data/EligibleAreasCensusTracts.csv"
        >CSV</a
      >
    </div>
  </div>
</template>

<script>
import { getCensusData } from "@/services/Content";
import debounce from "lodash/debounce";
export default {
  async created() {
    this.fetchContent();
  },
  watch: {
    search(newValue, oldValue) {
      this.searchArr.push(newValue);
    }
  },
  mounted() {
    let input = document.getElementById("my-input");
    let vm = this;
    let timeout = null;

    input.addEventListener("keyup", function(e) {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        console.log("Google event:", input.value);
        // vm.$ga.event({
        //   eventCategory: "Search Conversion",
        //   eventAction: "Input",
        //   eventLabel: `Query: '${input.value}'`
        // });
      }, 1000);
    });
  },
  computed: {
    displaySimpleTable() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.xs
        ? true
        : false;
    }
  },
  data() {
    return {
      showToc: true,
      loading: true,
      items: null,
      search: "",
      timeout: null,
      searchArr: [],
      headers: [
        {
          text: "State",
          align: "left",
          sortable: false,
          value: "state_name"
        },
        { text: "County", value: "county_name" },
        { text: "Census Tract Name", value: "census_tract_name" },
        { text: "Census Tract GeoID", value: "census_tract_geoid" }
      ]
    };
  },
  methods: {
    async fetchContent() {
      NProgress.start();
      this.loading = true;
      try {
        let items = await getCensusData();
        this.items = items;
        this.loading = false;
        NProgress.done();
      } catch (e) {
        this.loading = false;
        NProgress.done();
        console.log("Error: ", e);
      }
    }
  }
};
</script>
