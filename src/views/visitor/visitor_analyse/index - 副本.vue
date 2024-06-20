<template>
  <div class="dashboard-editor-container colonn center_center" style="padding-top: 10px;">

    <!-- <div style="height: 50px;"></div> -->
      <div class="roww  " style="width: 100%;position: fixed;left: 250px;top: 130px;">
        <el-button type="success" @click.stop="downloadPdf">导出本次展会报告</el-button>
        <div class="allline"></div>
      </div>
      <!-- <div style="height: 20px;"></div> -->
    <div class="colonn"
     id="pdf_container" ref="pdf_container"
     style="width:900px;background-color: #fff;padding:20px;">
      <div class="roww">
        <img
          src="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/cc7fcbcb6483444aa73501d3a22f3c69_20220803092643A007.png"
          style="width: 50px;height: 50px;" />
        <div class="allline"></div>
        <div class="colonn">
          <div>2022（第71届）秋季全国五金商品交易会</div>
          <div>2022年9月3日-9月5日 临沂国际会展中心</div>
        </div>
      </div>
      <div style="height: 50px;"></div>
      <div class="roww center_center">
        <div style="font-size: 40px;font-weight: bold;margin:80px 0px;">2022（第71届）秋季全国五金商品交易会</div>
      </div>
      <div style="height: 50px;"></div>
      <div class="colonn">
        <div class="roww endend">
          <div class="title2">观众信息分析报告</div>
        </div>
        <div class="roww endend">
          <div class="huibianku"></div>
        </div>
        <div style="height:20px;"></div>
        <div class="roww endend">
          <div class=" jubandiai">举办地点：</div>
          <div>临沂国际会展中心</div>
        </div>
        <div style="height:5px;"></div>
        <div class="roww endend">
          <div class=" jubandiai">展会时间：</div>
          <div>2022年9月3日-9月5日</div>
        </div>
        <div style="height:50px;"></div>

        <div class="roww endend">
          <div>中视扬帆(北京)新媒体科技有限公司</div>
        </div>
        <div class="roww endend">
          <div>中视扬帆 zsyf</div>
        </div>

      <!--  <div class="roww endend">
          <div>文档编号: 中视扬帆220902L-1</div>
        </div> -->

        <div class="roww endend">
          <div>文档编写者: 中视扬帆研发部</div>
        </div>

        <div class="roww endend">
          <div>文档日期: 2022-9-8</div>
        </div>

        <div class="fenjiexain"></div>

        <div style="line-height: 30px;">
          版权说明：
          本文档所包含的展会相关信息是受本次展览会主办商保护和保密的，而文档构成思想、结构和编制方法属于中视扬帆所有。中视扬帆将本文档提交与贵公司，只是为了更全面和真实地反应有关信息，并只供有关人员使用。在未事先得到中视扬帆书面同意之前，本文档和中视扬帆相关的部分内容不得提供给和本次展览会无关的第三方。
          “中视扬帆保证观众信息的真实性（包括但不限于数据库管理系统，系统后台，表单等载体），任何的数据报告将以观众注册时所自愿提交的信息为基准，中视扬帆保留就此所产生的合理范围内的误差权利。
        </div>
      </div>

      <div style="height:30px;"></div>

      <div class="colonn center_center">
        <div class="mulutxt">目录</div>
        <div class="colonn">
          <div class="roww center_center" style="width: 800px;">
            <div>一、报告概念说明</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>1</div>
          </div>
        </div>
        <div style="height:30px;"></div>
        <div class="colonn">
          <div class="roww center_center" style="width: 800px;">
            <div>二、总体观众情况</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>2</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>观众到达情况统计</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>2.1</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>有效数据构成</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>2.2</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>观众信息的质量指标</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>2.3</div>
          </div>
        </div>


        <div style="height:30px;"></div>
        <div class="colonn">
          <div class="roww center_center" style="width: 800px;">
            <div>三、观众来源分析</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>3</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>观众类别分析</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>3.1</div>
          </div>

          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>观众职务、部门规范化处理统计</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>3.2</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>按照观众部门分类统计</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>3.3</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>按照观众职位分类统计</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>3.4</div>
          </div>
        </div>





        <div style="height:30px;"></div>
        <div class="colonn">
          <div class="roww center_center" style="width: 800px;">
            <div>四、观众调查问题统计</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>4</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>调查问题1．贵公司的业务性质？</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>4.1</div>
          </div>

          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>调查问题2．贵公司经营或感兴趣的产品？</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>4.2</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>调查问题3．贵公司参观展会的目的？</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>4.3</div>
          </div>
          <div style="height:30px;"></div>
          <div class="roww center_center" style="width: 800px;">
            <div style="width: 100px;"></div>
            <div>调查问题4．获展渠道？</div>
            <div style="width: 20px;"></div>
            <div class="allline linejiane"></div>
            <div style="width: 20px;"></div>
            <div>4.4</div>
          </div>
        </div>
      </div>
      <div style="height: 50px;"></div>
      <div class="colonn">
        <div class="baogaos">一、报告概念说明</div>
        <div class="txtsbaolistle">
          中视扬帆根据用户所在地区将其分为：华北、华东、华南、西南、西北、东北、华中<br />
          华北：北京、天津、河北、山西、内蒙古<br />
          华东：上海、浙江、江苏、安徽、山东、福建、江西<br />
          华南：广东、广西、海南<br />
          西南：四川、重庆、云南、贵州、西藏<br />
          西北：陕西、甘肃、宁夏、青海、新疆<br />
          东北：吉林、辽宁、黑龙江<br />
          华中：湖南、湖北、河南<br />
        </div>
        <div style="height: 20px;"></div>
        <div class="txtsbaolistle">
          观众信息整理：整补邮编、电话整理、国外观众甄别<br />
          整补邮编：对于没有填写邮编的观众，系统根据电话和地址来自动添加邮编<br />
          电话整理：将观众填写的电话信息进行统一的整理，规范成统一的标准格式<br />
          国外观众甄别：根据电话和地址信息对国外观众进行区分。<br />
        </div>

        <div class="roww center_center">
          <img src="./image/liaocai.jpg" style="width: 200px;height: 200px;" />
        </div>

        <div style="height: 20px;"></div>
        <div class="txtsbaolistle">
          无效数据：重复信息、信息填写不完整、字迹潦草<br />
          重复信息：一个人的名片多次办理，造成的重复信息<br />
          信息填写不完整：填写的信息不足以能够联系到此人<br />
          字迹潦草：填写不清楚，字迹潦草无法辨认的信息。<br />
        </div>

        <div class="roww center_center">
          <img src="./image/img2.jpg" style="width: 200px;height: 200px;" />
        </div>
        <div style="height: 20px;"></div>
        <div class="txtsbaolistle">
          中视扬帆对展览会观众职位信息进行规范化处理和统计<br />
          将职位规范为：决策者、部门管理、专业员工 <br />
          部门规范为：管理、销售、采购、技术、服务<br />
        </div>

      </div>
      <div style="height: 30px;"></div>
      <div class="colonn" style="width: 860px;">
        <div class="baogaos">二、总体观众情况</div>
        <div style="height: 10px;"></div>
        <div class="title2">观众到达情况统计</div>
        <div class="txtsbaolistle">
          根据中视扬帆开发的展览会现场管理系统统计结果如下：
          “2022（第71届）秋季全国五金商品交易会”于9月3日至9月5日在临沂国际会展中心举办。本届展会共有参观观众8013人，门禁系统统计刷卡记录为10773人次。其中：展会第一日参观观众4790人，均为新到会观众。第二日参观观众3520人，其中新到会观众2572人。第三日参观观众为1000人，其中新到会观众651人。
        </div>
        <el-table :data="tableData" style="width: 70%;margin-left: 15%;">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
        <div style="height: 30px;"></div>
        <div class="title2">各日参观人数比例图：</div>
        <div style="height: 30px;"></div>
        <div class="chart-wrapper">
          <!-- <pie-chart /> -->
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref="chart1" id="chart1" style="width: 100%; height: 300px; display: inline-block;"></div>
          </div>
        </div>
        <div class="txtsbaolistle">
          经中视扬帆展览系统的观众信息整理，包括整补邮编及电话整理、无效数据筛选整
          理、国外观众甄别等数据处理后得到本届展会观众信息数据库8013人，来自中国大陆
          29个省级行政单位的212个县市
        </div>

        <div style="height: 30px;"></div>
        <div class="title2">有效数据组成：</div>
        <div style="height: 30px;"></div>
        <div class="chart-wrapper">
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref="chart2" id="chart2" style="width: 100%; height: 300px; display: inline-block;"></div>
          </div>
        </div>
        <div style="height: 30px;"></div>
        <div class="title2">观众信息的质量指标：</div>
        <div style="height: 30px;"></div>
        <div class="txtsbaolistle colonn" style="line-height: 40px;">
          <div>
            * 我们保留数据的原则是基于主办方开展营销联络工作最大化进行的：
          </div>

          <div style="margin-left: 40px;">
            可以发直邮的信息(包括姓名、公司、地址及邮编）；
          </div>
          <div style="margin-left: 40px;">
            群发传真信息（电话及传真号码）；<br>
          </div>
          <div style="margin-left: 40px;">
            群发短信（手机号码信息）；<br>
          </div>
          <div style="margin-left: 40px;">
            群发E-mail（E-mail信息）<br>
          </div>

          <div style="height: 30px;"></div>

          <div class="chart-wrapper">
            <div style="font-size: 50px;color: red;" class="roww center_center">
              <div ref='chartzht1' style="width: 100%; height: 300px;"></div>
            </div>
          </div>


          <!-- <div class="chart-wrapper">
            <div style="font-size: 50px;color: red;" class="roww center_center">
              <div ref="chart3" id="chart3" style="width: 100%; height: 300px; display: inline-block;"></div>
            </div>
          </div> -->
          <div style="height: 30px;"></div>
        </div>

        <div class="title2">按联系方式数量统计分析：</div>
        <div style="height: 30px;"></div>


        <div class="chart-wrapper">
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref='chartzht2' style="width: 100%; height: 300px;"></div>
          </div>
        </div>


        <div style="height: 30px;"></div>
      </div>


      <div class="colonn" style="width: 860px;">
        <div class="baogaos">三、观众来源分析</div>
        <div style="height: 10px;"></div>

        <div class="txtsbaolistle">
          中视扬帆 专用的GenReport 系统根据观众综合信息采用计算机算法规范化观众的城市数据，可以依据城市数据来大致分析观众的区域来源情况。为下届展会的宣传推广提供依据。
        </div>
        <div style="height: 20px;"></div>
        <div class="title2">观众类别分析</div>
        <div class="chart-wrapper">
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref="chart3" style="width: 100%; height: 300px; display: inline-block;"></div>
          </div>
        </div>
        <div style="height: 30px;"></div>
        <div class="title2">大陆地区观众区域分类统计（行政区域）</div>
        <div style="height: 30px;"></div>

        <div class="txtsbaolistle">
          按照行政区域分析，展会本地信息占总体观众比例的46.49%。<span style="font-weight: bold;color: black;">此外，观众来自非展会</span><br>
          <span style="font-weight: bold;color: black;">举办地的各区域比例如下图所示，</span>可以看到，来自华东地区的观众占了相对比例70.35%，<br>
          其他区域分别为：华北15.44%，华中7.95%，华南2.22%，东北1.52%，西北1.49%，西<br>
          南1.03%。
        </div>

        <div style="height: 30px;"></div>
        <div class="chart-wrapper">
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref="chart4" style="width: 100%; height: 300px; display: inline-block;"></div>
          </div>
        </div>
        <div style="height: 30px;"></div>

        <div style="height: 30px;"></div>
        <div class="title2">大陆地区观众按省份分类统计：</div>
        <div style="height: 30px;"></div>
        <!--  :row-class-name="setRowBackground" -->
        <el-table :data="tableData1" style="width: 70%;margin-left: 15%;" :row-class-name="setRowBackground"
          show-summary :summary-method="getSummaries">
          <el-table-column prop="quyu" label="区域" width="180">
          </el-table-column>
          <el-table-column prop="shengfen" label="省份" width="180">
          </el-table-column>
          <el-table-column prop="xaingduirenshu" label="相对人数">
          </el-table-column>
          <el-table-column prop="suozhajnbili" label="所占比例">
          </el-table-column>
        </el-table>


        <div style="height: 30px;"></div>
        <!-- <div style="font-size: 50px;color: red;">中国地图</div> -->

        <div ref="chartMap" class="chart" style="width: 800px;height: 1000px;"></div>


        <div style="height: 30px;"></div>


        <div style="height: 30px;"></div>
        <div class="title2">观众来源城市情况列表：</div>
        <div style="height: 10px;"></div>
        <div class="txtsbaolistle">
          以下列出观众来源30人以上的城市，不包含临沂观众3725人。<br />
          百分比以非展会本地的大陆地区观众4288为基数计算。<br />
        </div>
        <div style="height: 30px;"></div>

        <el-table :data="tableData2" style="width: 80%;margin-left: 10%;" :row-class-name="setRowBackground"
          show-summary>
          <el-table-column prop="quyu" label="区域" width="150">
          </el-table-column>
          <el-table-column prop="chengshi" label="城市" width="150">
          </el-table-column>
          <el-table-column prop="shengfen" label="省份" width="150">
          </el-table-column>
          <el-table-column prop="xaingduirenshu" label="相对人数">
          </el-table-column>
          <el-table-column prop="suozhajnbili" label="所占比例">
          </el-table-column>
        </el-table>

        <div style="height: 30px;"></div>
        <div class="title2">观众职务、部门规范化处理统计：</div>
        <div style="height: 10px;"></div>
        <div class="txtsbaolistle">
          为了统计和方便管理，中视扬帆对出现4次以上的观众职位信息进行规范化处理和<br />
          统计，出现次数超过30的职位统计列表如下：<br />
        </div>

        <div style="height: 30px;"></div>
        <el-table :data="tableData3" style="width: 70%;margin-left: 15%;">
          <el-table-column prop="mp" label="名片职务/部门" width="180">
          </el-table-column>
          <el-table-column prop="cishu" label="出现次数" width="180">
          </el-table-column>
          <el-table-column prop="gfbm" label="规范部门">
          </el-table-column>
          <el-table-column prop="gfzw" label="规范职务">
          </el-table-column>
        </el-table>
        <div style="height: 10px;"></div>

        <div style="height: 30px;"></div>
        <div class="title2">按照观众部门分类统计：</div>
        <div style="height: 10px;"></div>
        <div style="height: 30px;"></div>
        <div class="chart-wrapper">
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref="chart5" style="width: 100%; height: 300px; display: inline-block;"></div>
          </div>
        </div>
        <div style="height: 30px;"></div>

        <div style="height: 30px;"></div>
        <div class="title2">按照观众职位分类统计：</div>
        <div style="height: 10px;"></div>
        <div style="height: 30px;"></div>
        <div class="chart-wrapper">
          <div style="font-size: 50px;color: red;" class="roww center_center">
            <div ref="chart6" style="width: 100%; height: 300px; display: inline-block;"></div>
          </div>
        </div>
        <div style="height: 30px;"></div>

      </div>

      <div class="colonn" style="width: 860px;">
        <div class="baogaos" 四、观众调查问题统计</div>
          <div style="height: 10px;"></div>

          <div style="height: 30px;"></div>
          <div class="title2">调查问题1．贵公司的业务性质？</div>
          <div style="height: 10px;"></div>

          <div style="height: 30px;"></div>
          <div class="chart-wrapper">
            <div style="font-size: 50px;color: red;" class="roww center_center">
              <div ref='chartzht3' style="width: 800px; height: 300px;"></div>
            </div>
          </div>
          <div style="height: 30px;"></div>

          <div style="height: 30px;"></div>
          <div>具体数据如下</div>
          <div style="height: 10px;"></div>
          <el-table :data="tableData4" style="width: 70%;margin-left: 15%;">
            <el-table-column prop="xx" label="选项">
            </el-table-column>
            <el-table-column prop="sl" label="数量">
            </el-table-column>
            <el-table-column prop="bili" label="比例">
            </el-table-column>
          </el-table>
          <div class="colonn">
            <ul style="font-weight: bold;line-height: 30px;">
              <li>样本总数8001，其中8001人回答了此题。</li>
              <li>百分比以回答此题的人数为基数分析，由于部分观众的多项选择，所以总百分比大于100%。</li>
            </ul>
          </div>
        </div>


      </div>




    </div>
</template>

<script>
  import * as echarts from 'echarts'
  import chinaMap from "@/assets/json/china";
  import echarts1 from 'echarts';

  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'

  export default {
    name: 'Index',
    components: {

    },
    data() {
      return {

        zhuzhuangtuTitle: [
          '观众信息的质量指标',
          '按联系方式数量统计分析',
          '贵公司的业务性质？'
        ], // 柱状图标题

        bztTitle: [
          '各日参观人数比例图',
          '有效数据组成',
          '观众类别分析',
          '大陆地区观众区域分类统计（行政区域）',
          '按照观众部门分类统计',
          '按照观众职位分类统计'
        ], //斌状图表格
        // 表格1数据
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],

        tableData1: [{
          quyu: '东北',
          shengfen: '',
          xaingduirenshu: '',
          suozhajnbili: ''
        }, {
          quyu: '',
          shengfen: '辽宁',
          xaingduirenshu: '34',
          suozhajnbili: '0.42'
        }, {
          quyu: '',
          shengfen: '辽宁',
          xaingduirenshu: '34',
          suozhajnbili: '0.42'
        }, {
          quyu: '',
          shengfen: '辽宁',
          xaingduirenshu: '34',
          suozhajnbili: '0.42'
        }],
        tableData2: [{
          quyu: '东北',
          chengshi: '',
          shengfen: '',
          xaingduirenshu: '',
          suozhajnbili: '',
        }, {
          quyu: '',
          chengshi: '沈阳',
          shengfen: '辽宁',
          xaingduirenshu: '34',
          suozhajnbili: '0.42'
        }],
        tableData3: [{
          mp: '经理',
          cishu: '2928',
          gfbm: '管理',
          gfzw: '部门管理'
        }, {
          mp: '经理',
          cishu: '2928',
          gfbm: '管理',
          gfzw: '部门管理'
        }, {
          mp: '经理',
          cishu: '2928',
          gfbm: '管理',
          gfzw: '部门管理'
        }, {
          mp: '经理',
          cishu: '2928',
          gfbm: '管理',
          gfzw: '部门管理'
        }, {
          mp: '经理',
          cishu: '2928',
          gfbm: '管理',
          gfzw: '部门管理'
        }],
        tableData4: [{
            xx: '制造商',
            'sl': 152,
            bili: '12%'
          },
          {
            xx: '制造商',
            'sl': 152,
            bili: '12%'
          }, {
            xx: '制造商',
            'sl': 152,
            bili: '12%'
          }, {
            xx: '制造商',
            'sl': 152,
            bili: '12%'
          }
        ],
        bzt1: [{
            value: 51.45,
            name: '2022-09-03'
          },
          {
            value: 37.81,
            name: '2022-09-04'
          },
          {
            value: 10.74,
            name: '2022-09-05'
          }
        ], //饼壮图1
        bzt2: [{
            value: 51.45,
            name: '现场微信'
          },
          {
            value: 37.81,
            name: '预登记微信'
          },
          {
            value: 10.74,
            name: '现场填表'
          }
        ],
        bzt3: [{
            value: 46.49,
            name: '展会本地观众'
          },
          {
            value: 53.51,
            name: '非展会本地的大陆观众'
          },
        ],
        bzt4: [{
            value: 70.35,
            name: '华东'
          },
          {
            value: 15.44,
            name: '华北'
          },
          {
            value: 7.95,
            name: '华中'
          },
          {
            value: 2.22,
            name: '华南'
          },
          {
            value: 1.52,
            name: '东北'
          },
          {
            value: 1.49,
            name: '西北'
          },
          {
            value: 1.03,
            name: '西南'
          }
        ],
        bzt5: [{
            value: 60.91,
            name: '管理'
          },
          {
            value: 6.09,
            name: '采购'
          }, {
            value: 9.71,
            name: '其他'
          }, {
            value: 2.69,
            name: '技术'
          }, {
            value: 19.20,
            name: '销售'
          }, {
            value: 1.40,
            name: '服务'
          }
        ],
        bzt6: [{
            'value': 47.83,
            'name': '部门管理'
          },
          {
            'value': 18.57,
            'name': '决策者'
          },
          {
            'value': 32.51,
            'name': '专业员工'
          },
          {
            'value': 1.09,
            'name': '其他'
          },
        ],
        zhtData: [
          [
            ['总样本数', '有地址信息', '有手机信息'],
            [100, 59.7, 100]
          ],
          [
            ['总样本数', '至少两种联系方式', '至少一种联系方式'],
            [100, 50.94, 100]
          ],
          [
            ['制', '商', '进商', '商商', '机构', '用户', '超市', '协会', '媒体', '其他'],
            [43.69, 40.52, 8.49, 21.10, 1.32, 2.80, 11.27, 2.47, 2.21, 2.09]
          ],
          // [['制造商','批发商','进出口商','经销商/代理商','政府机构','终端用户','五金建材家居超市','商会/协会','媒体','其他'],
          // [43.69,40.52,8.49,21.10,1.32,2.80,11.27,2.47,2.21,2.09]],
        ]

      }
    },

    created() {



    },
    mounted() {
      var list = [this.bzt1, this.bzt2, this.bzt3, this.bzt4, this.bzt5, this.bzt6]
      this.createBzt1(list);
      this.createZhuzhuangtu()
      this.loadMap()
    },
    methods: {
      // 保存为PDF
       async downloadPdf() {
              const pdf = new jsPDF('p', 'mm', 'a4')
              var page=this.$refs.pdf_container;
              html2canvas(page).then((canvas)=> {

                // 将 canvas 转换为 Base64 编码的 PNG 图片数据
                var  imageData = canvas.toDataURL('image/png')
                // imageData=this.decodeBase64(imageData);
                imageData=imageData.replace("data:image/png;base64,","")
                console.log("生成BASE64字符串---------",imageData);

                // 将 Base64 编码的 PNG 图片数据转换为 Blob 对象
                const byteCharacters = atob(imageData)
                const byteNumbers = new Array(byteCharacters.length)
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                const byteArray = new Uint8Array(byteNumbers)
                const blob = new Blob([byteArray], { type: 'image/png' })

                // 创建 URL 对象
                const url = URL.createObjectURL(blob)

                // 创建 a 标签，并设置其 download 属性和 href 属性，使浏览器自动下载文件
                const link = document.createElement('a')
                link.download = 'example.png'
                link.href = url

                // 将 a 标签添加到 DOM 中，并点击该标签以完成下载操作
                document.body.appendChild(link)
                link.click()

                // 释放 URL 对象
                URL.revokeObjectURL(url)







                 // page.appendChild(canvas);
              });


          },



         decodeBase64(base64Str) {
            const chunkSize = 10000; // 分割大小
            let decoded = '';
            for (let i = 0; i < base64Str.length; i += chunkSize) {
              const chunk = base64Str.substring(i, i + chunkSize);
              decoded += window.atob(chunk);
            }
            return decoded;
          },




      // 加载地图
      loadMap() {
        //
        var chain_map = echarts.init(this.$refs.chartMap);
        echarts.registerMap('chinaMap', chinaMap) //注册地图
        var option = {
          geo: {
            map: "chinaMap", //绘画的地图
            zoom: 1.2, //缩放比例
            itemStyle: { //每一项的样式
              areaColor: "#fff", //地区颜色
              borderColor: "#666", //边框颜色
              borderWidth: "0.3", //边框宽度
              opacity: 1 //不透明度
            },
            label: { //文字
              show: true, //展示文字
              fontSize: 8, //字体大小
            },
            emphasis: { //附加属性（强调）
              itemStyle: {
                areaColor: "#b4ffff" //鼠标经过的颜色
              },
              select: { //选中设置
                itemStyle: {
                  areaColor: "#0f2c66" //选中颜色设置
                }
              }
            },


          },
          tooltip: { //提示框
            show: true, //默认展示
            trigger: 'item', //触发展示每一项
            triggerOn: 'click', //触发形式（点击）
            formatter(parmas) {
              return `名称：${parmas.name} <br/>确诊人数：${parmas.value}`
            },
            //弹窗样式
            padding: 3, //内边距
            borderColor: '#333',
            backgroundColor: "rgba(50,50,50,0.7)", //
            textStyle: {
              //文本样式
              color: '#fff'
            }
          },
          series: [{ //数据
            type: 'map', //类型
            geoIndex: 0, //索引
            data: [{
                name: '北京市',
                value: 233
              },
              {
                name: '山东省',
                value: 99
              },
              {
                name: '新疆维吾尔自治区',
                value: 9
              },
              {
                name: '山西省',
                value: 50
              },
              {
                name: '辽宁省',
                value: 999
              },
              {
                name: '江苏省',
                value: 50
              },
              {
                name: '河南省',
                value: 1001
              },
              {
                name: '湖南省',
                value: 10001
              },
              {
                name: '内蒙古自治区',
                value: 500
              },
              {
                name: '青海省',
                value: 888
              },
              {
                name: '西藏自治区',
                value: 999
              },
              {
                name: '四川省',
                value: 5562
              },
              {
                name: '陕西省',
                value: 7844
              },
              {
                name: '广西壮族自治区',
                value: 710
              },
              {
                name: '宁夏回族自治区',
                value: 150
              },
              {
                name: '黑龙江省',
                value: 1504
              },
              {
                name: '河北省',
                value: 150
              },
              {
                name: '江西省',
                value: 100000
              },
              {
                name: '福建省',
                value: 50
              },
              {
                name: '胡本省',
                value: 3520
              },
              {
                name: '甘肃省',
                value: 5
              },
              {
                name: '台湾省',
                value: 5
              },
            ]
          }],
          visualMap: { //视觉映射
            type: 'piecewise', //分段
            pieces: [ //块<!--min~max区间值----label显示的字段（标题）color:展示的颜色-->
              {
                min: 0,
                max: 0,
                label: '0',
                // color: '#fff'
                color: '#fff'
              },
              {
                min: 1,
                max: 9,
                label: '1-9',
                // color: '#ffe4da'
                color: '#cbfbcd'
              },
              {
                min: 10,
                max: 99,
                label: '10-99',
                // color: '#ff937f'
                color: '#96ff99'
              },
              {
                min: 100,
                max: 999,
                label: '100-999',
                // color: '#ff6c5e'
                color: '#61fd66'
              },
              {
                min: 1000,
                max: 9999,
                label: '1000-9999',
                // color: '#fe3335'
                color: '#29e62f'
              },
              {
                min: 10000,
                label: '≥10000',
                // color: '#cd0000'
                color: '#09850d'
              },
            ]
          }

        }
        chain_map.setOption(option);


      },

      // 创建柱状图
      createZhuzhuangtu() {
        var chartzhtNodes = [];
        chartzhtNodes.push(this.$refs.chartzht1);
        chartzhtNodes.push(this.$refs.chartzht2);
        chartzhtNodes.push(this.$refs.chartzht3);
        for (var a = 0; a < chartzhtNodes.length; a++) {
          let chart3 = echarts.init(chartzhtNodes[a]);
          // 使用选项配置图表
          chart3.setOption({
            legend: {
              data: ['销量', '销量2', '销量3', '销量4', '销量5', '销量6']
            },
            grid: {
              top: "30%",
              containLabel: true
            },
            title: {
              text: ""
            },
            xAxis: {
              data: this.zhtData[a][0]
            },
            yAxis: {},
            series: [{
              name: '柱状图',
              type: 'bar',
              data: this.zhtData[a][1],
              label: {
                // 柱图头部显示值
                show: true,
                position: "top",
                color: "#333",
                fontSize: "12px",

              },
            }]
          });
        }
      },
      // 创建斌状图1
      createBzt1(list) {
        var chartNodes = [];
        chartNodes.push(this.$refs.chart1);
        chartNodes.push(this.$refs.chart2);
        chartNodes.push(this.$refs.chart3);
        chartNodes.push(this.$refs.chart4);
        chartNodes.push(this.$refs.chart5);
        chartNodes.push(this.$refs.chart6);
        for (var a = 0; a < list.length; a++) {
          console.log('this.bztTitle[a]', this.bztTitle[a])
          let chart = echarts.init(chartNodes[a]);
          // 使用选项配置图表
          chart.setOption({
            title: {
              text: ""
            },
            grid: {
              top: "30px"
            },
            series: [{
              type: 'pie',
              data: list[a],
              label: {
                show: true,
                formatter: '{b}: {c} ({d}%)'
              },
              tooltip: {
                 show: true,
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
              }
            }]
          }, true);
        }



      },


      // 编写合计逻辑
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = ['合计', "", '', 0];
        console.log('param', param.data)

        return sums;
      },


      // 修改表格北京颜色
      setRowBackground(row) {
        var info = row.row
        console.log("asd", info, info.quyu)
        if (info.quyu.length > 0) {
          console.log("设置成绿色")
          return 'bg-green';
        }
        return "";
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import url(index.css);

  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
