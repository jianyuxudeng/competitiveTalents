<template>
    <section class="job_management">
        <div class="nav-bg"></div>
        <div class="job_head">
            <div class="job_nav">
                <a :class="{active: active == index}" v-for="(item, index) in navs" :key="index" @click="tapItem(index)">{{item}}</a>
            </div>
        </div>
        <JobRelease @handleActive="tapRouter" v-if="active == 0"></JobRelease>
        <ResumeManage @toJobRelease="toJobRelease" v-if="active == 1"></ResumeManage>
        <ResumeTemplate @toJobRelease="toJobRelease" v-if="active == 2"></ResumeTemplate>
        <BuyingPackages v-if="active == 3"></BuyingPackages>
    </section>
</template>

<script>
import "./index.less";
import JobRelease from '../job-release';
import ResumeManage from '../resume-manage';
import ResumeTemplate from '../resume-template';
import BuyingPackages from '../buying-packages';
export default {
    name: 'job-management',
    components: {
        JobRelease,
        ResumeManage,
        ResumeTemplate,
        BuyingPackages
    },
    data() {
        return {
            navs: ['新增职位', '职位管理', '职位模板', '套餐使用情况&购买'],
            active: 0
        }
    },
    methods: {
        tapItem(index) {
            if(this.active != index) localStorage.setItem('jobId', null);
            this.active = index;
        },
        tapRouter(evt) {
            this.active = evt;
        },
        toJobRelease(obj) {
            this.active = obj.index;
            localStorage.setItem('jobId', obj.id);
        }
    }
}
</script>