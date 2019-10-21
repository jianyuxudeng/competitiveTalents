<template>
    <section class="job_management">
        <div class="nav-bg"></div>
        <div class="job_head">
            <div class="job_nav">
                <a :class="{active: active == index}" v-for="(item, index) in navs" :key="index" @click="tapItem(index)">{{item}}</a>
            </div>
        </div>
        <JobRelease v-if="active == 0"></JobRelease>
    </section>
</template>

<script>
import "./index.less";
import JobRelease from '../job-release';
export default {
    name: 'job-management',
    components: {
        JobRelease
    },
    data() {
        return {
            navs: ['新增职位', '职位管理', '职位模板', '套餐使用情况&购买'],
            active: 0
        }
    },
    methods: {
        tapItem(index) {
            this.active = index;
        }
    }
}
</script>